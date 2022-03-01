// 顶点着色器
var VSHADER_SOURCE = `
  attribute vec4 a_Position;
  attribute vec4 a_Color;

  uniform mat4 u_MvpMatrix;// 位置变换矩阵

  uniform bool u_Clicked;

  varying vec4 v_Color;
  void main() {
    gl_Position = u_MvpMatrix * a_Position;
    if (u_Clicked) {
      // 红色
      v_Color = vec4(1.0, 0.0, 0.0, 1.0);
    } else {
      v_Color = a_Color;
    }
  }
`;

// 片段着色器代码
var FSHADER = `
  #ifdef GL_ES
    precision mediump float;
  #endif
  varying vec4 v_Color;
  void main(){
    gl_FragColor = v_Color;
  }`;

function main() {
  var hud = document.getElementById("hud");
  const ctx = hud.getContext("2d");

  /** @type {HTMLCanvasElement} */
  var canvas = document.getElementById("webgl");
  // 初始化WebGL上下文
  const gl = canvas.getContext("webgl");

  if (!initShaders(gl, VSHADER_SOURCE, FSHADER)) {
    console.log("着色器初始化失败!");
  }

  // 初始化顶点信息
  var n = initVertexBuffers(gl);
  if (n < 0) {
    console.log("初始化顶点失败");
    return;
  }

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);

  // 位置转换矩阵
  var u_MvpMatrix = gl.getUniformLocation(gl.program, "u_MvpMatrix");
  var u_Clicked = gl.getUniformLocation(gl.program, "u_Clicked");

  // 计算视图投影矩阵
  var viewProjMatrix = new Matrix4();
  viewProjMatrix.setPerspective(30.0, canvas.width / canvas.height, 1.0, 100.0);
  viewProjMatrix.lookAt(3.0, 3.0, 7.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);

  gl.uniform1i(u_Clicked, 0); // Pass false to u_Clicked

  var currentAngle = 0.0; // Current rotation angle
  hud.onmousedown = function (ev) {
    draw2(ctx);
    var x = ev.clientX,
      y = ev.clientY;
    // 元素相对于视窗的位置集合
    var rect = ev.target.getBoundingClientRect();
    // 在元素内
    if (rect.left <= x && x < rect.right && rect.top <= y && y < rect.bottom) {
      var x_in_canvas = x - rect.left,
        y_in_canvas = rect.bottom - y;
      var picked = check(gl, n, x_in_canvas, y_in_canvas, currentAngle, u_Clicked, viewProjMatrix, u_MvpMatrix);
      if (picked) alert("The cube was selected! ");
    }
  };

  var tick = function () {
    // Start drawing
    currentAngle = animate(currentAngle);
    draw(gl, n, currentAngle, viewProjMatrix, u_MvpMatrix);
    requestAnimationFrame(tick, canvas);
  };
  tick();
}

function draw2(ctx, num) {
  ctx.clearRect(0, 0, 400, 400);
  ctx.beginPath();
  ctx.moveTo(120, 10);
  ctx.lineTo(200, 150);
  ctx.lineTo(40, 150);
  ctx.closePath();
  ctx.strokeStyle = "rgba(255,255,255,1)";
  ctx.stroke();

  ctx.font = "18px";
  ctx.fillStyle = "rgba(255,255,255,1)";
  ctx.fillText("哈哈", 40, 180);
}

function check(gl, n, x, y, currentAngle, u_Clicked, viewProjMatrix, u_MvpMatrix) {
  var picked = false;
  gl.uniform1i(u_Clicked, 1);
  draw(gl, n, currentAngle, viewProjMatrix, u_MvpMatrix);

  // 获取当前缓冲区的颜色
  var pixels = new Uint8Array(4);
  gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

  if (pixels[0] == 255) picked = true;

  gl.uniform1i(u_Clicked, 0); // Pass false to u_Clicked(rewrite the cube)
  draw(gl, n, currentAngle, viewProjMatrix, u_MvpMatrix); // Draw the cube

  return picked;
}

var ANGLE_STEP = 20.0; // Rotation angle (degrees/second)
var last = Date.now(); // Last time that this function was called
function animate(angle) {
  var now = Date.now(); // Calculate the elapsed time
  var elapsed = now - last;
  last = now;
  // Update the current rotation angle (adjusted by the elapsed time)
  var newAngle = angle + (ANGLE_STEP * elapsed) / 1000.0;
  return newAngle % 360;
}

var g_MvpMatrix = new Matrix4(); // Model view projection matrix
function draw(gl, n, currentAngle, viewProjMatrix, u_MvpMatrix) {
  // Caliculate The model view projection matrix and pass it to u_MvpMatrix
  g_MvpMatrix.set(viewProjMatrix);
  g_MvpMatrix.rotate(currentAngle, 1.0, 0.0, 0.0); // Rotate appropriately
  g_MvpMatrix.rotate(currentAngle, 0.0, 1.0, 0.0);
  g_MvpMatrix.rotate(currentAngle, 0.0, 0.0, 1.0);
  gl.uniformMatrix4fv(u_MvpMatrix, false, g_MvpMatrix.elements);

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // Clear buffers
  gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0); // Draw
}

function initVertexBuffers(gl) {
  // Create a cube
  //    v6----- v5
  //   /|      /|
  //  v1------v0|
  //  | |     | |
  //  | |v7---|-|v4
  //  |/      |/
  //  v2------v3
  // prettier-ignore
  var vertices = new Float32Array([   // Vertex coordinates
     1.0, 1.0, 1.0,  -1.0, 1.0, 1.0,  -1.0,-1.0, 1.0,   1.0,-1.0, 1.0,    // v0-v1-v2-v3 front
     1.0, 1.0, 1.0,   1.0,-1.0, 1.0,   1.0,-1.0,-1.0,   1.0, 1.0,-1.0,    // v0-v3-v4-v5 right
     1.0, 1.0, 1.0,   1.0, 1.0,-1.0,  -1.0, 1.0,-1.0,  -1.0, 1.0, 1.0,    // v0-v5-v6-v1 up
    -1.0, 1.0, 1.0,  -1.0, 1.0,-1.0,  -1.0,-1.0,-1.0,  -1.0,-1.0, 1.0,    // v1-v6-v7-v2 left
    -1.0,-1.0,-1.0,   1.0,-1.0,-1.0,   1.0,-1.0, 1.0,  -1.0,-1.0, 1.0,    // v7-v4-v3-v2 down
     1.0,-1.0,-1.0,  -1.0,-1.0,-1.0,  -1.0, 1.0,-1.0,   1.0, 1.0,-1.0     // v4-v7-v6-v5 back
  ]);

  // prettier-ignore
  var colors = new Float32Array([   // Colors
    0.2, 0.58, 0.82,   0.2, 0.58, 0.82,   0.2,  0.58, 0.82,  0.2,  0.58, 0.82, // v0-v1-v2-v3 front
    0.5,  0.41, 0.69,  0.5, 0.41, 0.69,   0.5, 0.41, 0.69,   0.5, 0.41, 0.69,  // v0-v3-v4-v5 right
    0.0,  0.32, 0.61,  0.0, 0.32, 0.61,   0.0, 0.32, 0.61,   0.0, 0.32, 0.61,  // v0-v5-v6-v1 up
    0.78, 0.69, 0.84,  0.78, 0.69, 0.84,  0.78, 0.69, 0.84,  0.78, 0.69, 0.84, // v1-v6-v7-v2 left
    0.32, 0.18, 0.56,  0.32, 0.18, 0.56,  0.32, 0.18, 0.56,  0.32, 0.18, 0.56, // v7-v4-v3-v2 down
    0.73, 0.82, 0.93,  0.73, 0.82, 0.93,  0.73, 0.82, 0.93,  0.73, 0.82, 0.93, // v4-v7-v6-v5 back
  ]);

  // Indices of the vertices
  // prettier-ignore
  var indices = new Uint8Array([
     0, 1, 2,   0, 2, 3,    // front
     4, 5, 6,   4, 6, 7,    // right
     8, 9,10,   8,10,11,    // up
    12,13,14,  12,14,15,    // left
    16,17,18,  16,18,19,    // down
    20,21,22,  20,22,23     // back
  ]);

  // Write vertex information to buffer object
  if (!initArrayBuffer(gl, vertices, gl.FLOAT, 3, "a_Position")) return -1; // Coordinate Information
  if (!initArrayBuffer(gl, colors, gl.FLOAT, 3, "a_Color")) return -1; // Color Information

  // Create a buffer object
  var indexBuffer = gl.createBuffer();
  if (!indexBuffer) {
    return -1;
  }
  // Write the indices to the buffer object
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  return indices.length;
}

function initArrayBuffer(gl, data, type, num, attribute) {
  // Create a buffer object
  var buffer = gl.createBuffer();
  if (!buffer) {
    console.log("Failed to create the buffer object");
    return false;
  }
  // Write date into the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  // Assign the buffer object to the attribute variable
  var a_attribute = gl.getAttribLocation(gl.program, attribute);
  if (a_attribute < 0) {
    console.log("Failed to get the storage location of " + attribute);
    return false;
  }
  gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
  // Enable the assignment to a_attribute variable
  gl.enableVertexAttribArray(a_attribute);

  return true;
}

// 顶点着色器代码
var VSHADER = `
  attribute vec4 a_Position;// 点位置
  uniform mat4 u_MvpMatrix;

  attribute vec4 a_Normal;// 法向量
  uniform vec3 u_LightColor;// 光线颜色
  uniform vec3 u_LightDirection;// 归一化的 世界坐标
  uniform vec3 u_AmbientLight;// 环境光颜色

  // 颜色
  attribute vec4 a_Color;
  varying vec4 v_Color;
  void main(){
    gl_Position = u_MvpMatrix * a_Position;
    // 法向量进行 归一化
    vec3 normal = normalize(a_Normal.xyz);
    // vec3 normal = normalize(vec3(a_Normal));
    // 计算光线方向 和 法向量的点积
    float nDotL = max(dot(u_LightDirection,normal),0.0);
    // 计算漫反射光的颜色
    vec3 diffuse = u_LightColor * a_Color.rgb * nDotL;
    // 计算 环境光 产生的 反射光颜色
    vec3 ambient = u_AmbientLight * a_Color.rgb;
    v_Color = vec4(diffuse + ambient,a_Color.a);
  }`;

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
  /** @type {HTMLCanvasElement} */
  var canvas = document.getElementById("webgl");
  // 初始化WebGL上下文
  const gl = canvas.getContext("webgl");

  if (!initShaders(gl, VSHADER, FSHADER)) {
    console.log("着色器初始化失败!");
  }

  gl.clearColor(0, 0, 0, 1);
  gl.enable(gl.DEPTH_TEST);

  var n = initVertexBuffers(gl);

  //
  var u_MvpMatrix = gl.getUniformLocation(gl.program, "u_MvpMatrix");
  var u_LightColor = gl.getUniformLocation(gl.program, "u_LightColor");
  var u_LightDirection = gl.getUniformLocation(gl.program, "u_LightDirection");
  var u_AmbientLight = gl.getUniformLocation(gl.program, "u_AmbientLight");

  gl.uniform3f(u_AmbientLight, 0.2, 0.2, 0.2);

  // 设置光源颜色
  gl.uniform3f(u_LightColor, 1.0, 1.0, 1.0);
  // 设置光源方向
  var lightDirection = new Vector3([0.5, 3.0, 4.0]);
  lightDirection.normalize(); // Normalize
  gl.uniform3fv(u_LightDirection, lightDirection.elements);

  // Calculate the view projection matrix
  var mvpMatrix = new Matrix4(); // Model view projection matrix
  mvpMatrix.setPerspective(30, canvas.width / canvas.height, 1, 100);
  mvpMatrix.lookAt(3, 3, 7, 0, 0, 0, 0, 1, 0);
  // Pass the model view projection matrix to the variable u_MvpMatrix
  gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);

  // Clear color and depth buffer
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0); // Draw the cube
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
  var vertices = new Float32Array([
    // Coordinates
    1.0,
    1.0,
    1.0,
    -1.0,
    1.0,
    1.0,
    -1.0,
    -1.0,
    1.0,
    1.0,
    -1.0,
    1.0, // v0-v1-v2-v3 front
    1.0,
    1.0,
    1.0,
    1.0,
    -1.0,
    1.0,
    1.0,
    -1.0,
    -1.0,
    1.0,
    1.0,
    -1.0, // v0-v3-v4-v5 right
    1.0,
    1.0,
    1.0,
    1.0,
    1.0,
    -1.0,
    -1.0,
    1.0,
    -1.0,
    -1.0,
    1.0,
    1.0, // v0-v5-v6-v1 up
    -1.0,
    1.0,
    1.0,
    -1.0,
    1.0,
    -1.0,
    -1.0,
    -1.0,
    -1.0,
    -1.0,
    -1.0,
    1.0, // v1-v6-v7-v2 left
    -1.0,
    -1.0,
    -1.0,
    1.0,
    -1.0,
    -1.0,
    1.0,
    -1.0,
    1.0,
    -1.0,
    -1.0,
    1.0, // v7-v4-v3-v2 down
    1.0,
    -1.0,
    -1.0,
    -1.0,
    -1.0,
    -1.0,
    -1.0,
    1.0,
    -1.0,
    1.0,
    1.0,
    -1.0 // v4-v7-v6-v5 back
  ]);

  var colors = new Float32Array([
    // Colors
    1,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    0, // v0-v1-v2-v3 front
    1,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    0, // v0-v3-v4-v5 right
    1,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    0, // v0-v5-v6-v1 up
    1,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    0, // v1-v6-v7-v2 left
    1,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    0, // v7-v4-v3-v2 down
    1,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    0 // v4-v7-v6-v5 back
  ]);

  var normals = new Float32Array([
    // Normal
    0.0,
    0.0,
    1.0,
    0.0,
    0.0,
    1.0,
    0.0,
    0.0,
    1.0,
    0.0,
    0.0,
    1.0, // v0-v1-v2-v3 front
    1.0,
    0.0,
    0.0,
    1.0,
    0.0,
    0.0,
    1.0,
    0.0,
    0.0,
    1.0,
    0.0,
    0.0, // v0-v3-v4-v5 right
    0.0,
    1.0,
    0.0,
    0.0,
    1.0,
    0.0,
    0.0,
    1.0,
    0.0,
    0.0,
    1.0,
    0.0, // v0-v5-v6-v1 up
    -1.0,
    0.0,
    0.0,
    -1.0,
    0.0,
    0.0,
    -1.0,
    0.0,
    0.0,
    -1.0,
    0.0,
    0.0, // v1-v6-v7-v2 left
    0.0,
    -1.0,
    0.0,
    0.0,
    -1.0,
    0.0,
    0.0,
    -1.0,
    0.0,
    0.0,
    -1.0,
    0.0, // v7-v4-v3-v2 down
    0.0,
    0.0,
    -1.0,
    0.0,
    0.0,
    -1.0,
    0.0,
    0.0,
    -1.0,
    0.0,
    0.0,
    -1.0 // v4-v7-v6-v5 back
  ]);

  // Indices of the vertices
  var indices = new Uint8Array([
    0,
    1,
    2,
    0,
    2,
    3, // front
    4,
    5,
    6,
    4,
    6,
    7, // right
    8,
    9,
    10,
    8,
    10,
    11, // up
    12,
    13,
    14,
    12,
    14,
    15, // left
    16,
    17,
    18,
    16,
    18,
    19, // down
    20,
    21,
    22,
    20,
    22,
    23 // back
  ]);

  // Write the vertex property to buffers (coordinates, colors and normals)
  if (!initArrayBuffer(gl, "a_Position", vertices, 3, gl.FLOAT)) return -1;
  if (!initArrayBuffer(gl, "a_Color", colors, 3, gl.FLOAT)) return -1;
  if (!initArrayBuffer(gl, "a_Normal", normals, 3, gl.FLOAT)) return -1;

  // Write the indices to the buffer object
  var indexBuffer = gl.createBuffer();
  if (!indexBuffer) {
    console.log("Failed to create the buffer object");
    return false;
  }

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  return indices.length;
}

function initArrayBuffer(gl, attribute, data, num, type) {
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
  // Enable the assignment of the buffer object to the attribute variable
  gl.enableVertexAttribArray(a_attribute);

  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  return true;
}

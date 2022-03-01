// 顶点着色器
var VSHADER_SOURCE = `
  attribute vec4 a_Position; // 顶点数据
  attribute vec4 a_Normal; // 法向量
  uniform mat4 u_MvpMatrix; // 模型视图投影矩阵
  uniform mat4 u_NormalMatrix;// 用于变换法向量

  // attribute vec4 a_Color;// 颜色
  varying vec4 v_Color;// 传递颜色 片元着色器
  void main(){
    vec4 a_Color = vec4(1.0, 0.4, 0.0, 1.0);

    gl_Position = u_MvpMatrix * a_Position;
    // 固定灯光方向
    vec3 lightDirection = normalize(vec3(0.0, 0.5, 0.7));
    // 法向量进行 归一化
    vec3 normal = normalize((u_NormalMatrix * a_Normal).xyz);
    // 计算光线方向 和 法向量的点积
    float nDotL = max(dot(normal, lightDirection), 0.0);
    // 固定 环境光 产生的 反射光颜色 vec3(0.1)
    v_Color = vec4(a_Color.rgb * nDotL + vec3(0.1), a_Color.a);
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
  /** @type {HTMLCanvasElement} */
  var canvas = document.getElementById("webgl");
  // 初始化WebGL上下文
  const gl = canvas.getContext("webgl");

  if (!initShaders(gl, VSHADER_SOURCE, FSHADER)) {
    console.log("着色器初始化失败!");
  }

  // 初始化顶点信息
  var n = initVBuffers(gl);
  if (n < 0) {
    console.log("Failed to set the vertex information");
    return;
  }

  // 清空画布
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);

  // var a_Color = gl.getUniformLocation(gl.program, "a_Color");
  var u_MvpMatrix = gl.getUniformLocation(gl.program, "u_MvpMatrix");
  var u_NormalMatrix = gl.getUniformLocation(gl.program, "u_NormalMatrix");

  // 计算视图投影矩阵
  var viewProjMatrix = new Matrix4();
  viewProjMatrix.setPerspective(50.0, canvas.width / canvas.height, 1.0, 100.0);
  viewProjMatrix.lookAt(20.0, 10.0, 30.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);

  // 键盘操控
  document.onkeydown = function (ev) {
    keydown(ev, gl, n, viewProjMatrix, u_MvpMatrix, u_NormalMatrix);
  };

  // 绘图
  draw(gl, n, viewProjMatrix, u_MvpMatrix, u_NormalMatrix); // Draw the robot arm
}

var ANGLE_STEP = 3.0; // 旋转角度增量（度）
var g_arm1Angle = -90.0; // arm1 当前角度（度）
var g_joint1Angle = 0.0; // joint1的当前角度（度）
var g_joint2Angle = 0.0; // joint2的当前角度（度）
var g_joint3Angle = 0.0; // joint3的当前角度（度）

function keydown(ev, gl, n, viewProjMatrix, u_MvpMatrix, u_NormalMatrix) {
  switch (ev.keyCode) {
    case 38:
      if (g_joint1Angle < 135.0) g_joint1Angle += ANGLE_STEP;
      break;
    case 40:
      if (g_joint1Angle > -135.0) g_joint1Angle -= ANGLE_STEP;
      break;
    case 39:
      g_arm1Angle = (g_arm1Angle + ANGLE_STEP) % 360;
      break;
    case 37:
      g_arm1Angle = (g_arm1Angle - ANGLE_STEP) % 360;
      break;
    case 90: // z
      g_joint2Angle = (g_joint2Angle + ANGLE_STEP) % 360;
      break;
    case 88: // x
      g_joint2Angle = (g_joint2Angle - ANGLE_STEP) % 360;
      break;
    case 86: // v
      if (g_joint3Angle < 60.0)
        g_joint3Angle = (g_joint3Angle + ANGLE_STEP) % 360;
      break;
    case 67: // c
      if (g_joint3Angle > -60.0)
        g_joint3Angle = (g_joint3Angle - ANGLE_STEP) % 360;
      break;
    default:
      return;
  }

  draw(gl, n, viewProjMatrix, u_MvpMatrix, u_NormalMatrix);
}

// 坐标变化矩阵
var g_modelMatrix = new Matrix4(),
  g_mvpMatrix = new Matrix4();
function draw(gl, n, viewProjMatrix, u_MvpMatrix, u_NormalMatrix) {
  // 清空画布
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // 底座
  var baseHeight = 2.0;
  g_modelMatrix.setTranslate(0.0, -12.0, 0.0);
  drawBox(
    gl,
    n,
    10.0,
    baseHeight,
    10.0,
    viewProjMatrix,
    u_MvpMatrix,
    u_NormalMatrix
  );

  // Arm1
  var arm1Length = 10.0;
  g_modelMatrix.translate(0.0, baseHeight, 0.0);
  g_modelMatrix.rotate(g_arm1Angle, 0.0, 1.0, 0.0); // y轴旋转
  drawBox(
    gl,
    n,
    3.0,
    arm1Length,
    3.0,
    viewProjMatrix,
    u_MvpMatrix,
    u_NormalMatrix
  );

  // Arm2
  var arm2Length = 10.0;
  g_modelMatrix.translate(0.0, arm1Length, 0.0); //
  g_modelMatrix.rotate(g_joint1Angle, 0.0, 0.0, 1.0); //
  // g_modelMatrix.scale(1.3, 1.0, 1.3); // z轴旋转
  drawBox(
    gl,
    n,
    4.0,
    arm2Length,
    4.0,
    viewProjMatrix,
    u_MvpMatrix,
    u_NormalMatrix
  ); // Draw

  // A palm
  var palmLength = 2.0;
  g_modelMatrix.translate(0.0, arm2Length, 0.0); // Move to palm
  g_modelMatrix.rotate(g_joint2Angle, 0.0, 1.0, 0.0); // Rotate around the y-axis
  drawBox(
    gl,
    n,
    2.0,
    palmLength,
    6.0,
    viewProjMatrix,
    u_MvpMatrix,
    u_NormalMatrix
  ); // Draw

  // 移动到 palm 中点
  g_modelMatrix.translate(0.0, palmLength, 0.0);

  // finger1
  pushMatrix(g_modelMatrix);
  g_modelMatrix.translate(0.0, 0.0, 2.0);
  g_modelMatrix.rotate(g_joint3Angle, 1.0, 0.0, 0.0); // Rotate around the x-axis
  drawBox(gl, n, 1.0, 1.0, 1.0, viewProjMatrix, u_MvpMatrix, u_NormalMatrix); // Draw
  g_modelMatrix = popMatrix();

  // finger2
  g_modelMatrix.translate(0.0, 0.0, -2.0);
  g_modelMatrix.rotate(-g_joint3Angle, 1.0, 0.0, 0.0); // Rotate around the x-axis
  drawBox(gl, n, 1.0, 1.0, 1.0, viewProjMatrix, u_MvpMatrix, u_NormalMatrix);

  // --层级绘画 最上面的 变换 所有图形都会执行
}

// 当 不是上下结构时 需要保存最 开始的 位置转换矩阵
var g_matrixStack = [];
function pushMatrix(m) {
  var m2 = new Matrix4(m);
  g_matrixStack.push(m2);
}

function popMatrix() {
  // Retrieve the matrix from the array
  return g_matrixStack.pop();
}

var g_normalMatrix = new Matrix4(); // Coordinate transformation matrix for normals

// Draw the cube
function drawBox(
  gl,
  n,
  width,
  height,
  depth,
  viewProjMatrix,
  u_MvpMatrix,
  u_NormalMatrix
) {
  // 放入原值
  pushMatrix(g_modelMatrix);
  // 设置缩放
  g_modelMatrix.scale(width, height, depth);

  // 计算模型视图项目矩阵并将其传递给 u_MvpMatrix
  g_mvpMatrix.set(viewProjMatrix);
  g_mvpMatrix.multiply(g_modelMatrix);
  gl.uniformMatrix4fv(u_MvpMatrix, false, g_mvpMatrix.elements);
  // 计算正规变换矩阵并将其传递给 u_NormalMatrix;
  g_normalMatrix.setInverseOf(g_modelMatrix);
  g_normalMatrix.transpose();
  gl.uniformMatrix4fv(u_NormalMatrix, false, g_normalMatrix.elements);
  // Draw
  gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);
  g_modelMatrix = popMatrix(); // 恢复 矩阵变换原值
}

// 初始化顶点
function initVBuffers(gl) {
  //
  var vertices = new Float32Array([
    0.5,
    1.0,
    0.5,
    -0.5,
    1.0,
    0.5,
    -0.5,
    0.0,
    0.5,
    0.5,
    0.0,
    0.5, // v0-v1-v2-v3 front
    0.5,
    1.0,
    0.5,
    0.5,
    0.0,
    0.5,
    0.5,
    0.0,
    -0.5,
    0.5,
    1.0,
    -0.5, // v0-v3-v4-v5 right
    0.5,
    1.0,
    0.5,
    0.5,
    1.0,
    -0.5,
    -0.5,
    1.0,
    -0.5,
    -0.5,
    1.0,
    0.5, // v0-v5-v6-v1 up
    -0.5,
    1.0,
    0.5,
    -0.5,
    1.0,
    -0.5,
    -0.5,
    0.0,
    -0.5,
    -0.5,
    0.0,
    0.5, // v1-v6-v7-v2 left
    -0.5,
    0.0,
    -0.5,
    0.5,
    0.0,
    -0.5,
    0.5,
    0.0,
    0.5,
    -0.5,
    0.0,
    0.5, // v7-v4-v3-v2 down
    0.5,
    0.0,
    -0.5,
    -0.5,
    0.0,
    -0.5,
    -0.5,
    1.0,
    -0.5,
    0.5,
    1.0,
    -0.5 // v4-v7-v6-v5 back
  ]);

  // 法向量
  var normals = new Float32Array([
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

  // 顶点的索引
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

  if (!initArrayBuffer(gl, "a_Position", vertices, gl.FLOAT, 3)) return -1;
  if (!initArrayBuffer(gl, "a_Normal", normals, gl.FLOAT, 3)) return -1;

  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  // 将索引写入缓冲区对象
  var indexBuffer = gl.createBuffer();
  if (!indexBuffer) {
    console.log("Failed to create the buffer object");
    return -1;
  }
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  return indices.length;
}

function initArrayBuffer(gl, attribute, data, type, num) {
  // 创建缓冲区
  var buffer = gl.createBuffer();
  if (!buffer) {
    console.log("创建缓冲区 失败");
    return false;
  }
  // 将缓冲区对象绑定到目标
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  // 向缓冲区对象中写入数据
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

  // 获取缓存区 对象
  var a_attribute = gl.getAttribLocation(gl.program, attribute);
  if (a_attribute < 0) {
    console.log("获取缓存区 对象 失败 " + attribute);
    return false;
  }

  // 将缓冲区对象分配给 a position变量
  gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
  // 连接 a_Position变量与分配给它的缓冲区对象
  gl.enableVertexAttribArray(a_attribute);

  return true;
}

var VSHADER_SOURCE = `
  attribute vec4 a_Position;
  attribute vec4 a_Color;
  attribute vec4 a_Normal;// 法向量

  uniform mat4 u_MvpMatrix;// 位置变换矩阵
  uniform mat4 u_NormalMatrix;// 法向量变换矩阵

  uniform bool u_Clicked;// 点击

  varying vec4 v_Color;
  void main() {
    // 固定灯光 方向
    vec3 lightDirection = vec3(-0.35, 0.35, 0.87);
    gl_Position = u_MvpMatrix * a_Position;
    // 法向量 归一化
    vec3 normal = normalize(vec3(u_NormalMatrix * a_Normal));
    // 点积计算 -- 
    float nDotL = max(dot(normal, lightDirection), 0.0);
    if (u_Clicked) {
      // 红色
      v_Color = vec4(1.0, 0.0, 0.0, 1.0);
    } else {
      v_Color = vec4(a_Color.rgb * nDotL, a_Color.a);
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
  var canvas = document.getElementById("webgl");
  // 初始化WebGL上下文
  const gl = canvas.getContext("webgl");

  if (!initShaders(gl, VSHADER_SOURCE, FSHADER)) {
    console.log("着色器初始化失败!");
  }

  gl.clearColor(0.2, 0.2, 0.2, 1.0);
  gl.enable(gl.DEPTH_TEST);

  // 获取 着色器变量
  var program = gl.program;
  program.a_Position = gl.getAttribLocation(program, "a_Position");
  program.a_Normal = gl.getAttribLocation(program, "a_Normal");
  program.a_Color = gl.getAttribLocation(program, "a_Color");
  program.u_MvpMatrix = gl.getUniformLocation(program, "u_MvpMatrix");
  program.u_NormalMatrix = gl.getUniformLocation(program, "u_NormalMatrix");

  var u_Clicked = gl.getUniformLocation(gl.program, "u_Clicked");
  gl.uniform1i(u_Clicked, 0); // 默认 未点击

  var model = initVertexBuffers(gl, program);

  // 计算 视图投影矩阵
  var viewProjMatrix = new Matrix4();
  viewProjMatrix.setPerspective(30.0, canvas.width / canvas.height, 1.0, 5000.0);
  viewProjMatrix.lookAt(0.0, 500.0, 200.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);

  // 加载 .obj 文件
  readOBJFile("cube.obj", gl, model, 60, true);

  var currentAngle = 0.0; // 当前 旋转角度

  // 注册点击事件
  canvas.onmousedown = function (ev) {
    var x = ev.clientX,
      y = ev.clientY;
    var rect = ev.target.getBoundingClientRect();
    if (rect.left <= x && x < rect.right && rect.top <= y && y < rect.bottom) {
      var x_in_canvas = x - rect.left,
        y_in_canvas = rect.bottom - y;
      var picked = check(gl, x_in_canvas, y_in_canvas, currentAngle, u_Clicked, viewProjMatrix, model);
      if (picked) alert("点中了");
    }
  };

  var tick = function () {
    currentAngle = animate(currentAngle); // Update current rotation angle
    draw(gl, gl.program, currentAngle, viewProjMatrix, model, 1);

    requestAnimationFrame(tick, canvas);
  };
  tick();

  // draw(gl, gl.program, currentAngle, viewProjMatrix, model, -10);
}

var ANGLE_STEP = 30; // 角度曾量
var last = Date.now(); // Last time that this function was called
function animate(angle) {
  var now = Date.now(); // Calculate the elapsed time
  var elapsed = now - last;
  last = now;
  // Update the current rotation angle (adjusted by the elapsed time)
  var newAngle = angle + (ANGLE_STEP * elapsed) / 1000.0;
  return newAngle % 360;
}

function check(gl, x, y, currentAngle, u_Clicked, viewProjMatrix, model) {
  var picked = false;
  gl.uniform1i(u_Clicked, 1);
  draw(gl, gl.program, currentAngle, viewProjMatrix, model);

  var pixels = new Uint8Array(4);
  gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

  if (pixels[0] == 255) picked = true;

  gl.uniform1i(u_Clicked, 0); // Pass false to u_Clicked(rewrite the cube)
  draw(gl, gl.program, currentAngle, viewProjMatrix, model);

  return picked;
}

/**
 * 获取文件
 * @param {*} fileName 文件名
 * @param {*} gl webGl
 * @param {*} model 顶点着色器 变量 对象组
 * @param {*} scale
 * @param {*} reverse
 */
function readOBJFile(fileName, gl, model, scale, reverse) {
  // 加载 ajax
  var request = new XMLHttpRequest();
  // 当请求被发送到服务器时，我们需要执行一些基于响应的任务。
  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status !== 404) {
      // 数据加载成功
      onReadOBJFile(request.responseText, fileName, gl, model, scale, reverse);
    }
  };
  request.open("GET", fileName, true);
  // 发送 HTTP 请求
  request.send();
}

var g_objDoc = null; // 目标文件信息
var g_drawingInfo = null; // 绘制三维模型的信息

/**
 * 初始化 obj 对象
 * @param {*} fileString 文件 数据
 * @param {*} fileName 文件名
 * @param {*} gl webgl
 * @param {*} o 顶点着色器 变量 对象组
 * @param {*} scale
 * @param {*} reverse
 * @returns
 */
function onReadOBJFile(fileString, fileName, gl, o, scale, reverse) {
  var objDoc = new OBJDoc(fileName); // Create a OBJDoc object
  var result = objDoc.parse(fileString, scale, reverse); // Parse the file
  if (!result) {
    g_objDoc = null;
    g_drawingInfo = null;
    console.log("初始化 obj 格式数据失败");
    return;
  }
  g_objDoc = objDoc;
}

// 坐标变换矩阵
var g_modelMatrix = new Matrix4();
var g_mvpMatrix = new Matrix4();
var g_normalMatrix = new Matrix4();
/**
 * 开始绘制
 * @param {*} gl wenGl
 * @param {*} program 着色器对象
 * @param {*} angle 当前角度
 * @param {*} viewProjMatrix 视图投影矩阵
 * @param {*} model 着色器 变量对象组
 * @returns
 */
function draw(gl, program, angle, viewProjMatrix, model, tran) {
  //  g_objDoc -- 目标文件信息
  if (g_objDoc != null && g_objDoc.isMTLComplete()) {
    // OBJ 和 所有 MTL 都可用
    g_drawingInfo = onReadComplete(gl, model, g_objDoc);
    g_objDoc = null;
  }
  if (!g_drawingInfo) return; // 确定模型是否已装入

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // Clear color and depth buffers

  g_modelMatrix.setRotate(angle, 1.0, 0.0, 0.0); //
  g_modelMatrix.rotate(angle, 0.0, 1.0, 0.0);
  g_modelMatrix.rotate(angle, 0.0, 0.0, 1.0);

  // 计算法向量变换 u_NormalMatrix
  g_normalMatrix.setInverseOf(g_modelMatrix);
  g_normalMatrix.transpose();
  gl.uniformMatrix4fv(program.u_NormalMatrix, false, g_normalMatrix.elements);

  // 计算模型视图项目矩阵并将其传递给 u_MvpMatrix
  g_mvpMatrix.set(viewProjMatrix);
  g_mvpMatrix.multiply(g_modelMatrix);
  gl.uniformMatrix4fv(program.u_MvpMatrix, false, g_mvpMatrix.elements);

  // Draw
  gl.drawElements(gl.TRIANGLES, g_drawingInfo.indices.length, gl.UNSIGNED_SHORT, 0);
}

/**
 * 读取 已解析的 obj 文件 数据
 * @param {*} gl webGl
 * @param {*} model 着色器 变量对象组
 * @param {*} objDoc 文件信息
 * @returns
 */
function onReadComplete(gl, model, objDoc) {
  // 顶点坐标、法线、颜色和索引 创建数组
  var drawingInfo = objDoc.getDrawingInfo();

  // Write date into the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, model.vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, drawingInfo.vertices, gl.STATIC_DRAW);

  gl.bindBuffer(gl.ARRAY_BUFFER, model.normalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, drawingInfo.normals, gl.STATIC_DRAW);

  gl.bindBuffer(gl.ARRAY_BUFFER, model.colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, drawingInfo.colors, gl.STATIC_DRAW);

  // Write the indices to the buffer object
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, drawingInfo.indices, gl.STATIC_DRAW);

  return drawingInfo;
}

/**
 * 创建 顶点着色器 缓冲区对象
 * @param {*} gl webGl
 * @param {*} program 着色器对象
 * @returns
 */
function initVertexBuffers(gl, program) {
  var o = new Object();
  o.vertexBuffer = createEmptyArrayBuffer(gl, program.a_Position, 3, gl.FLOAT);
  o.normalBuffer = createEmptyArrayBuffer(gl, program.a_Normal, 3, gl.FLOAT);
  o.colorBuffer = createEmptyArrayBuffer(gl, program.a_Color, 4, gl.FLOAT);
  // 创建一个缓冲区
  o.indexBuffer = gl.createBuffer();
  if (!o.vertexBuffer || !o.normalBuffer || !o.colorBuffer || !o.indexBuffer) {
    return null;
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  return o;
}

/**
 * 创建 顶点着色器 缓冲区对象 未添加关联数据
 * @param {*} gl webGl
 * @param {*} a_attribute 着色器变量
 * @param {*} num 顶点着色器 顶点属性的组成数量
 * @param {*} type 指定数组中每个元素的数据类型可能是
 * @returns
 */
function createEmptyArrayBuffer(gl, a_attribute, num, type) {
  var buffer = gl.createBuffer(); //
  if (!buffer) {
    console.log("创建 顶点着色器 缓冲区失败");
    return null;
  }
  // 将缓冲区对象 绑定到目标
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  // 将缓冲区对象分配给 着色器变量
  gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
  // 连接 着色器变量 与 分配给它的缓冲区对象
  gl.enableVertexAttribArray(a_attribute);

  return buffer;
}

//------------------------------------------------------------------------------
// OBJ 对象
//------------------------------------------------------------------------------
/**
 * OBJ 对象
 * @param {*} fileName 文件名
 */
var OBJDoc = function (fileName) {
  this.fileName = fileName;
  this.mtls = new Array(0); // MTL 文件信息
  this.objects = new Array(0); // obj文件 信息
  this.vertices = new Array(0); // Vertex 着色器顶点 信息
  this.normals = new Array(0); // Normal 法向量 信息
};

/**
 * 解析 OBJ文件
 * @param {*} fileString 文件 数据
 * @param {*} scale
 * @param {*} reverse
 * @returns
 */
OBJDoc.prototype.parse = function (fileString, scale, reverse) {
  // 获取 每一行数据
  var lines = fileString.split("\n");
  lines.push(null); // Append null
  var index = 0; // 初始化行的索引

  var currentObject = null;
  var currentMaterialName = "";

  // 逐行分析
  var line; // 行 信息
  var sp = new StringParser(); // 加载 字符串 解析器
  while ((line = lines[index++]) != null) {
    sp.init(line); // 初始 行 数据
    var command = sp.getWord(); // 获取第一个数据
    if (command == null) continue; // check null command

    switch (command) {
      case "#":
        continue; // 跳过注释
      case "mtllib": // 读取材质块
        var path = this.parseMtllib(sp, this.fileName);
        var mtl = new MTLDoc(); // Create MTL instance
        this.mtls.push(mtl); // 放入材质
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
          if (request.readyState == 4) {
            if (request.status != 404) {
              // 解析 mtl 文件 获取 材质 mtl
              onReadMTLFile(request.responseText, mtl);
            } else {
              mtl.complete = true;
            }
          }
        };
        request.open("GET", path, true); //
        request.send(); //
        continue; //
      case "o":
      case "g": // 获取 OBJObject 对象
        var object = this.parseObjectName(sp);
        this.objects.push(object);
        currentObject = object;
        continue; // Go to the next line
      case "v": // 获取顶点
        var vertex = this.parseVertex(sp, scale);
        this.vertices.push(vertex);
        continue; // Go to the next line
      case "vn": // 获取 法向量
        var normal = this.parseNormal(sp);
        this.normals.push(normal);
        continue; // Go to the next line
      case "usemtl": // 材料名称
        currentMaterialName = this.parseUsemtl(sp);
        continue; // Go to the next line
      case "f": // 获取 顶点索引
        var face = this.parseFace(sp, currentMaterialName, this.vertices, reverse);
        currentObject.addFace(face);
        continue; // Go to the next line
    }
  }

  return true;
};

// 解析 获取材质文件 路径
OBJDoc.prototype.parseMtllib = function (sp, fileName) {
  var i = fileName.lastIndexOf("/");
  var dirPath = "";
  if (i > 0) dirPath = fileName.substr(0, i + 1);
  // 返回路径  -- sp.getWord() 获取改行 第二个有效数据
  return dirPath + sp.getWord();
};

//
OBJDoc.prototype.parseObjectName = function (sp) {
  var name = sp.getWord();
  return new OBJObject(name);
};

// 获取顶点信息
OBJDoc.prototype.parseVertex = function (sp, scale) {
  var x = sp.getFloat() * scale;
  var y = sp.getFloat() * scale;
  var z = sp.getFloat() * scale;
  return new Vertex(x, y, z);
};
// 返回有效值 -- 材料名称
OBJDoc.prototype.parseUsemtl = function (sp) {
  return sp.getWord();
};

// 检查材料 是否可用
OBJDoc.prototype.isMTLComplete = function () {
  if (this.mtls.length == 0) return true;
  for (var i = 0; i < this.mtls.length; i++) {
    if (!this.mtls[i].complete) return false;
  }
  return true;
};

// 按材质名称查找颜色
OBJDoc.prototype.findColor = function (name) {
  for (var i = 0; i < this.mtls.length; i++) {
    for (var j = 0; j < this.mtls[i].materials.length; j++) {
      if (this.mtls[i].materials[j].name == name) {
        return this.mtls[i].materials[j].color;
      }
    }
  }
  return new Color(0.8, 0.8, 0.8, 1);
};

/**
 * 解析 物体面 信息
 * @param {*} sp 字符串 解析器
 * @param {*} materialName mtl 中对应的 材料名称
 * @param {*} vertices 顶点对象组
 * @param {*} reverse
 * @returns
 */
OBJDoc.prototype.parseFace = function (sp, materialName, vertices, reverse) {
  // 初始化 面对象
  var face = new Face(materialName);
  // get indices
  for (;;) {
    var word = sp.getWord(); // 获取 当前行有效值
    if (word == null) break;
    var subWords = word.split("/");
    if (subWords.length >= 1) {
      var vi = parseInt(subWords[0]) - 1;
      face.vIndices.push(vi);
    }
    if (subWords.length >= 3) {
      var ni = parseInt(subWords[2]) - 1;
      face.nIndices.push(ni);
    } else {
      face.nIndices.push(-1);
    }
  }

  // 根据 顶点索引 获取 顶点
  var v0 = [vertices[face.vIndices[0]].x, vertices[face.vIndices[0]].y, vertices[face.vIndices[0]].z];
  var v1 = [vertices[face.vIndices[1]].x, vertices[face.vIndices[1]].y, vertices[face.vIndices[1]].z];
  var v2 = [vertices[face.vIndices[2]].x, vertices[face.vIndices[2]].y, vertices[face.vIndices[2]].z];

  // 计算平面法线设置为 normal
  var normal = calcNormal(v0, v1, v2);
  // 检查法线是否正确要求
  if (normal == null) {
    if (face.vIndices.length >= 4) {
      // 如果平面是四角形，则用其他三点组合法线计算
      var v3 = [vertices[face.vIndices[3]].x, vertices[face.vIndices[3]].y, vertices[face.vIndices[3]].z];
      normal = calcNormal(v1, v2, v3);
    }
    if (normal == null) {
      // 发线 错误 修改默认值
      normal = [0.0, 1.0, 0.0];
    }
  }
  if (reverse) {
    normal[0] = -normal[0];
    normal[1] = -normal[1];
    normal[2] = -normal[2];
  }
  face.normal = new Normal(normal[0], normal[1], normal[2]);

  // 如果面包 含超过3个点，则划分为三角形。
  if (face.vIndices.length > 3) {
    var n = face.vIndices.length - 2;
    var newVIndices = new Array(n * 3);
    var newNIndices = new Array(n * 3);
    for (var i = 0; i < n; i++) {
      newVIndices[i * 3 + 0] = face.vIndices[0];
      newVIndices[i * 3 + 1] = face.vIndices[i + 1];
      newVIndices[i * 3 + 2] = face.vIndices[i + 2];
      newNIndices[i * 3 + 0] = face.nIndices[0];
      newNIndices[i * 3 + 1] = face.nIndices[i + 1];
      newNIndices[i * 3 + 2] = face.nIndices[i + 2];
    }
    face.vIndices = newVIndices;
    face.nIndices = newNIndices;
  }
  face.numIndices = face.vIndices.length;

  return face;
};

// 检索用于 绘制三维模型的信息
OBJDoc.prototype.getDrawingInfo = function () {
  // 为顶点坐标、法线、颜色和索引创建数组
  var numIndices = 0;
  for (var i = 0; i < this.objects.length; i++) {
    numIndices += this.objects[i].numIndices;
  }
  var numVertices = numIndices;
  // console.log("🚀 ~ file: OBJViewer.js ~ line 462 ~ numIndices", this.objects[0]);
  var vertices = new Float32Array(numVertices * 3);
  var normals = new Float32Array(numVertices * 3);
  var colors = new Float32Array(numVertices * 4);
  var indices = new Uint16Array(numIndices);

  // Set vertex, normal and color
  var index_indices = 0;
  for (var i = 0; i < this.objects.length; i++) {
    var object = this.objects[i];
    for (var j = 0; j < object.faces.length; j++) {
      var face = object.faces[j];
      var color = this.findColor(face.materialName);
      var faceNormal = face.normal;
      for (var k = 0; k < face.vIndices.length; k++) {
        // Set index
        indices[index_indices] = index_indices;
        // Copy vertex
        var vIdx = face.vIndices[k];
        var vertex = this.vertices[vIdx];
        vertices[index_indices * 3 + 0] = vertex.x;
        vertices[index_indices * 3 + 1] = vertex.y;
        vertices[index_indices * 3 + 2] = vertex.z;
        // Copy color
        colors[index_indices * 4 + 0] = color.r;
        colors[index_indices * 4 + 1] = color.g;
        colors[index_indices * 4 + 2] = color.b;
        colors[index_indices * 4 + 3] = color.a;
        // Copy normal
        var nIdx = face.nIndices[k];
        if (nIdx >= 0) {
          var normal = this.normals[nIdx];
          normals[index_indices * 3 + 0] = normal.x;
          normals[index_indices * 3 + 1] = normal.y;
          normals[index_indices * 3 + 2] = normal.z;
        } else {
          normals[index_indices * 3 + 0] = faceNormal.x;
          normals[index_indices * 3 + 1] = faceNormal.y;
          normals[index_indices * 3 + 2] = faceNormal.z;
        }
        index_indices++;
      }
    }
  }

  return new DrawingInfo(vertices, normals, colors, indices);
};

// ------------------------------------------------------------------------------
// MTL 文件解析
/**
 *
 * @param {*} fileString 文件 数据
 * @param {*} mtl  MTLDoc 对象 -- 自定义对象
 */
function onReadMTLFile(fileString, mtl) {
  var lines = fileString.split("\n"); // 获取 每一行数据
  lines.push(null); // Append null
  var index = 0; // 初始化行的索引

  // 逐行分析
  var line; //  行 信息
  var name = ""; // Material name
  var sp = new StringParser(); // 加载 字符串 解析器
  while ((line = lines[index++]) != null) {
    sp.init(line); // 初始 行 数据
    var command = sp.getWord(); //  获取 第一个 数据
    if (command == null) continue; // check null command

    switch (command) {
      case "#":
        continue; // 跳过注释
      case "newmtl": // 读取材料块
        name = mtl.parseNewmtl(sp); // 获取名称
        continue; // 跳过
      case "Kd": //
        if (name == "") continue; // 由于错误转到下一行
        var material = mtl.parseRGB(sp, name);
        // 材料对象 放入数组
        mtl.materials.push(material);
        name = "";
        continue; // 跳过
    }
  }
  mtl.complete = true; // 修改状态
}

//------------------------------------------------------------------------------
// MTLDoc 对象
//------------------------------------------------------------------------------
var MTLDoc = function () {
  this.complete = false; // 是否 可用状态
  this.materials = new Array(0);
};

//
MTLDoc.prototype.parseNewmtl = function (sp) {
  return sp.getWord(); // Get name
};

//
MTLDoc.prototype.parseRGB = function (sp, name) {
  var r = sp.getFloat();
  var g = sp.getFloat();
  var b = sp.getFloat();
  return new Material(name, r, g, b, 1);
};

//------------------------------------------------------------------------------
// Material Object 材料对象
//------------------------------------------------------------------------------
var Material = function (name, r, g, b, a) {
  this.name = name;
  this.color = new Color(r, g, b, a);
};

//------------------------------------------------------------------------------
// Color Object
//------------------------------------------------------------------------------
var Color = function (r, g, b, a) {
  this.r = r;
  this.g = g;
  this.b = b;
  this.a = a;
};

//------------------------------------------------------------------------------
// Vertex Object 顶点对象
//------------------------------------------------------------------------------
var Vertex = function (x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
};

//------------------------------------------------------------------------------
// Normal Object 法向量 对象
//------------------------------------------------------------------------------
var Normal = function (x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
};

//------------------------------------------------------------------------------
// Face Object 面 对象
//------------------------------------------------------------------------------
var Face = function (materialName) {
  this.materialName = materialName;
  if (materialName == null) this.materialName = "";
  this.vIndices = new Array(0);
  this.nIndices = new Array(0);
};

//------------------------------------------------------------------------------
// DrawInfo Object 画图对象
//------------------------------------------------------------------------------
var DrawingInfo = function (vertices, normals, colors, indices) {
  this.vertices = vertices;
  this.normals = normals;
  this.colors = colors;
  this.indices = indices;
};

//------------------------------------------------------------------------------
// OBJObject Object
//------------------------------------------------------------------------------
var OBJObject = function (name) {
  this.name = name;
  this.faces = new Array(0);
  this.numIndices = 0;
};

OBJObject.prototype.addFace = function (face) {
  this.faces.push(face);
  this.numIndices += face.numIndices;
};

//------------------------------------------------------------------------------
// 字符串分析器
//------------------------------------------------------------------------------
// Constructor
var StringParser = function (str) {
  this.str;
  this.index;
  this.init(str);
};
// 初始化 数据
StringParser.prototype.init = function (str) {
  this.str = str;
  this.index = 0;
};
// 跳过分隔符
StringParser.prototype.skipDelimiters = function () {
  for (var i = this.index, len = this.str.length; i < len; i++) {
    var c = this.str.charAt(i);
    // Skip TAB, Space, '(', ')
    if (c == "\t" || c == " " || c == "(" || c == ")" || c == '"') continue;
    break;
  }
  this.index = i;
};

// 跳到下一个单词
StringParser.prototype.skipToNextWord = function () {
  this.skipDelimiters();
  var n = getWordLength(this.str, this.index);
  this.index += n + 1;
};

// 得到 对应数据
StringParser.prototype.getWord = function () {
  this.skipDelimiters();
  var n = getWordLength(this.str, this.index);
  if (n == 0) return null;
  var word = this.str.substr(this.index, n);
  this.index += n + 1;

  return word;
};

// 转换类型 Int
StringParser.prototype.getInt = function () {
  return parseInt(this.getWord());
};

// 转换类型 Float
StringParser.prototype.getFloat = function () {
  return parseFloat(this.getWord());
};

// 获取单词长度
function getWordLength(str, start) {
  var n = 0;
  for (var i = start, len = str.length; i < len; i++) {
    var c = str.charAt(i);
    if (c == "\t" || c == " " || c == "(" || c == ")" || c == '"') break;
  }
  return i - start;
}

//------------------------------------------------------------------------------
// Common function -- 计算平面法线
//------------------------------------------------------------------------------
function calcNormal(p0, p1, p2) {
  // v0: a vector from p1 to p0, v1; a vector from p1 to p2
  var v0 = new Float32Array(3);
  var v1 = new Float32Array(3);
  for (var i = 0; i < 3; i++) {
    v0[i] = p0[i] - p1[i];
    v1[i] = p2[i] - p1[i];
  }

  // The cross product of v0 and v1
  var c = new Float32Array(3);
  c[0] = v0[1] * v1[2] - v0[2] * v1[1];
  c[1] = v0[2] * v1[0] - v0[0] * v1[2];
  c[2] = v0[0] * v1[1] - v0[1] * v1[0];

  // Normalize the result
  var v = new Vector3(c);
  v.normalize();
  return v.elements;
}

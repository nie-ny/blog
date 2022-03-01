// cuon-utils.js (c) 2012 kanda and matsuda
/**
 * 创建程序对象并使其成为当前对象
 * @param gl GL context
 * @param vshader a vertex shader program (string)
 * @param fshader a fragment shader program (string)
 * @return true, if the program object was created and successfully made current
 */
function initShaders(gl, vshader, fshader) {
  var program = createProgram(gl, vshader, fshader);
  if (!program) {
    console.log("Failed to create program");
    return false;
  }

  // 添加到当前的渲染状态
  gl.useProgram(program);
  gl.program = program;

  return true;
}

/**
 * 创建链接的程序对象
 * @param gl GL context
 * @param vshader a vertex shader program (string)
 * @param fshader a fragment shader program (string)
 * @return created program object, or null if the creation has failed
 */
function createProgram(gl, vshader, fshader) {
  // 创建着色器对象
  var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader);
  var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader);
  if (!vertexShader || !fragmentShader) {
    return null;
  }

  // 创建程序对象
  var program = gl.createProgram();
  if (!program) {
    return null;
  }

  // 程序对象中 添加一个片段或者顶点着色器
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  // 连接一个program对象
  gl.linkProgram(program);

  // 检查链接结果
  var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!linked) {
    // program对象 链接日志
    var error = gl.getProgramInfoLog(program);
    console.log("program对象链接失败：" + error);
    // 清除错误信息
    gl.deleteProgram(program);
    gl.deleteShader(fragmentShader);
    gl.deleteShader(vertexShader);
    return null;
  }
  return program;
}

/**
 * 创建着色器对象
 * @param gl GL context
 * @param type 着色器对象的类型
 * @param source 着色器 GLSL程序代码
 * @return created shader object, or null if the creation has failed.
 */
function loadShader(gl, type, source) {
  // 创建 着色器对象
  var shader = gl.createShader(type);
  if (shader == null) {
    console.log("创建着色器对象失败");
    return null;
  }

  // 设置 着色器 GLSL程序代码
  gl.shaderSource(shader, source);

  // 编译着色器 -- 用于编译一个GLSL着色器，使其成为为二进制数据
  gl.compileShader(shader);

  // 检查编译结果 --返回着色器的信息
  var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!compiled) {
    // 返回着色器对象的信息日志
    var error = gl.getShaderInfoLog(shader);
    console.log("编译着色器错误日志: " + error);
    // 删除的 WebGLShader 对象
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

/**
 * Initialize and get the rendering for WebGL
 * @param canvas <cavnas> element
 * @param opt_debug flag to initialize the context for debugging
 * @return the rendering context for WebGL
 */
function getWebGLContext(canvas, opt_debug) {
  // Get the rendering context for WebGL
  var gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) return null;

  // if opt_debug is explicitly false, create the context for debugging
  if (arguments.length < 2 || opt_debug) {
    gl = WebGLDebugUtils.makeDebugContext(gl);
  }

  return gl;
}

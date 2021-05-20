// 创建 场景
var scene = new THREE.Scene();

var geometry = new THREE.BoxGeometry(100, 100, 100); //立方体

// TextureLoader创建一个纹理加载器对象，可以加载图片作为几何体纹理
var textureLoader = new THREE.TextureLoader();
// 加载法线贴图
var textureNormal = textureLoader.load("/normal3_256.jpg");
var material = new THREE.MeshPhongMaterial({
  color: 0xff0000,
  normalMap: textureNormal, //法线贴图
  //设置深浅程度，默认值(1,1)。
  normalScale: new THREE.Vector2(3, 3)
}); //材质对象Material
var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh

scene.add(mesh); //网格模型添加到场景中

// var geometry = new THREE.BoxGeometry(100, 100, 100); //立方体
// // var geometry = new THREE.PlaneGeometry(204, 102, 4, 4); //矩形平面
// // var geometry = new THREE.SphereGeometry(60, 25, 25); //球体
// // var geometry = new THREE.CylinderGeometry(60, 60, 25,25); //圆柱
// //
// // 材质对象1
// var material_1 = new THREE.MeshPhongMaterial({
//   color: 0xffff3f
// });
// var textureLoader = new THREE.TextureLoader(); // 纹理加载器
// var texture = textureLoader.load("sky.JPG"); // 加载图片，返回Texture对象
// // 材质对象2
// var material_2 = new THREE.MeshLambertMaterial({
//   map: texture // 设置纹理贴图
//   // wireframe:true,
// });
// // 设置材质数组
// var materialArr = [material_2, material_1, material_1, material_1, material_2, material_1];

// // 设置数组材质对象作为网格模型材质参数
// var mesh = new THREE.Mesh(geometry, materialArr); //网格模型对象Mesh
// scene.add(mesh); //网格模型添加到场景中

// 纹理贴图映射到一个矩形平面上
// var geometry = new THREE.PlaneGeometry(204, 102); //矩形平面
// var geometry = new THREE.BoxGeometry(100, 100, 100); //立方体

// geometry.faceVertexUvs[0].forEach((elem) => {
//   elem.forEach((Vector2) => {
//     // 所有的UV坐标全部设置为一个值
//     Vector2.set(0.4, 0.4);
//   });
// });

// var geometry = new THREE.PlaneGeometry(204, 102, 4, 4);

// /**
//  * 局部三角面显示完整纹理贴图
//  */
// var t0 = new THREE.Vector2(0, 1); //图片左下角
// var t1 = new THREE.Vector2(0, 0); //图片右下角
// var t2 = new THREE.Vector2(1, 0); //图片右上角
// var t3 = new THREE.Vector2(1, 1); //图片左上角
// var uv1 = [t0, t1, t3]; //选中图片一个三角区域像素——用于映射到一个三角面
// var uv2 = [t1, t2, t3]; //选中图片一个三角区域像素——用于映射到一个三角面
// // 设置第五、第六个三角形面对应的纹理坐标
// geometry.faceVertexUvs[0][4] = uv1;
// geometry.faceVertexUvs[0][5] = uv2;

// // TextureLoader创建一个纹理加载器对象，可以加载图片作为几何体纹理
// var textureLoader = new THREE.TextureLoader();
// // 执行load方法，加载纹理贴图成功后，返回一个纹理对象Texture
// textureLoader.load("sky.JPG", function (texture) {
//   console.log("🚀 ~ file: index.js ~ line 10 ~ texture", texture);
//   var material = new THREE.MeshLambertMaterial({
//     // color: 0x0000ff,
//     // 设置颜色纹理贴图：Texture对象作为材质map属性的属性值
//     map: texture //设置颜色贴图属性值
//   }); //材质对象Material
//   var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
//   scene.add(mesh); //网格模型添加到场景中

//   //纹理贴图加载成功后，调用渲染函数执行渲染操作
//   render();
// });

// 光源设置
// 点光源
var point = new THREE.PointLight(0xffffff);
point.position.set(100, 200, 300); // 点光源位置
scene.add(point); // 点光源添加到场景中

//环境光
var ambient = new THREE.AmbientLight(0x444444);
scene.add(ambient);

/**
 * 相机设置
 */
var width = window.innerWidth; //窗口宽度
var height = window.innerHeight; //窗口高度
var k = width / height; //窗口宽高比
var s = 100; //三维场景显示范围控制系数，系数越大，显示的范围越大

//创建相机对象
var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 2000);
camera.position.set(0, 100, 50); // 设置相机位置
camera.lookAt(scene.position); // 设置相机方向(指向的场景对象)

/**
 * 创建渲染器对象
 */
var renderer = new THREE.WebGLRenderer();
renderer.setSize(500, 500); // 设置渲染区域尺寸
renderer.setClearColor(0xb9d3ff, 1); // 设置背景颜色
document.body.appendChild(renderer.domElement); // body元素中插入canvas对象
// 执行渲染操作   指定场景、相机作为参数
// renderer.render(scene, camera);

function render() {
  renderer.render(scene, camera); //执行渲染操作
}

render();

var controls = new THREE.OrbitControls(camera, renderer.domElement); //创建控件对象
controls.addEventListener("change", render); //监听鼠标、键盘事件

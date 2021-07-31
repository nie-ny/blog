// 创建 场景
var scene = new THREE.Scene();

/**
 * 创建扫描网格模型
 */
var shape = new THREE.Shape();
/**四条直线绘制一个矩形轮廓*/
shape.moveTo(0, 0); //起点
shape.lineTo(0, 10); //第2点
shape.lineTo(10, 10); //第3点
shape.lineTo(10, 0); //第4点
shape.lineTo(0, 0); //第5点
/**创建轮廓的扫描轨迹(3D样条曲线)*/
var curve = new THREE.SplineCurve3([
  new THREE.Vector3(-10, -50, -50),
  new THREE.Vector3(10, 0, 0),
  new THREE.Vector3(8, 50, 50),
  new THREE.Vector3(-5, 0, 100)
]);
var geometry = new THREE.ExtrudeGeometry( //拉伸造型
  shape, //二维轮廓
  //拉伸参数
  {
    bevelEnabled: false, //无倒角
    extrudePath: curve, //选择扫描轨迹
    steps: 50 //扫描方向细分数
  }
);

// /**
//  * 创建旋转网格模型
//  */
// var shape = new THREE.Shape(); //创建Shape对象
// var points = [new THREE.Vector2(50, 60), new THREE.Vector2(25, 0), new THREE.Vector2(50, -60)];
// shape.splineThru(points); //顶点带入样条插值计算函数
// var splinePoints = shape.getPoints(10); //插值计算细分数20
// var geometry = new THREE.LatheGeometry(splinePoints, 30);

var material = new THREE.MeshPhongMaterial({
  color: 0x0000ff, //三角面颜色
  side: THREE.DoubleSide //两面可见
}); //材质对象
// material.wireframe = true; //线条模式渲染(查看细分数)
var mesh = new THREE.Mesh(geometry, material); //旋转网格模型对象
scene.add(mesh); //旋转网格模型添加到场景中

// var geometry = new THREE.Geometry(); //声明一个几何体对象Geometry
// // 绘制一个U型轮廓
// var R = 80; //圆弧半径
// var arc = new THREE.ArcCurve(0, 0, R, 0, Math.PI, true);
// // 半圆弧的一个端点作为直线的一个端点
// var line1 = new THREE.LineCurve(new THREE.Vector2(R, 200, 0), new THREE.Vector2(R, 0, 0));
// var line2 = new THREE.LineCurve(new THREE.Vector2(-R, 0, 0), new THREE.Vector2(-R, 200, 0));
// // 创建组合曲线对象CurvePath
// var CurvePath = new THREE.CurvePath();
// // 把多个线条插入到CurvePath中
// CurvePath.curves.push(line1, arc, line2);
// //分段数200
// var points = CurvePath.getPoints(200);
// // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
// geometry.setFromPoints(points);
// //材质对象
// var material = new THREE.LineBasicMaterial({
//   color: 0x000000
// });
// //线条模型对象
// var line = new THREE.Line(geometry, material);
// scene.add(line); //线条对象添加到场景中

// var geometry = new THREE.BoxGeometry(); //声明一个几何体对象Geometry
// // 三维样条曲线  Catmull-Rom算法
// var curve = new THREE.CatmullRomCurve3([
//   new THREE.Vector3(-50, 20, 90),
//   new THREE.Vector3(-10, 40, 40),
//   new THREE.Vector3(0, 0, 0),
//   new THREE.Vector3(60, -60, 0),
//   new THREE.Vector3(70, 0, 80)
// ]);

// var p1 = new THREE.Vector3(-80, 0, 0);
// var p2 = new THREE.Vector3(-40, 100, 0);
// var p3 = new THREE.Vector3(40, 100, 0);
// var p4 = new THREE.Vector3(80, 0, 0);
// // 三维三次贝赛尔曲线
// var curve = new THREE.CubicBezierCurve3(p1, p2, p3, p4);

// //getPoints是基类Curve的方法，返回一个vector3对象作为元素组成的数组
// var points = curve.getPoints(100); //分段数100，返回101个顶点
// // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
// geometry.setFromPoints(points);
// //材质对象
// var material = new THREE.LineBasicMaterial({
//   color: 0x000000
// });
// //线条模型对象
// var line = new THREE.Line(geometry, material);
// scene.add(line); //线条对象添加到场景中

// 创建网格模型;
//创建一个立方体几何对象Geometry
// var geometry = new THREE.BoxGeometry(100, 100, 100);

// var arc = new THREE.ArcCurve(0, 0, 100, 0, 2 * Math.PI);
// var points = arc.getPoints(50);
// geometry.setFromPoints(points);

// //材质对象
// var material = new THREE.LineBasicMaterial({
//   color: 0x000000
// });
// //线条模型对象
// var line = new THREE.Line(geometry, material);
// scene.add(line); //线条对象添加到场景中

// 材质
// var material = new THREE.MeshLambertMaterial({
//   color: 0x0000ff,
//   side: THREE.DoubleSide //两面可见
// });
// var mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh); // 网格模型添加到场景中

// 光源设置
// 点光源
var point = new THREE.PointLight(0xffffff);
point.position.set(100, 200, 300); // 点光源位置
scene.add(point); // 点光源添加到场景中

//环境光
var ambient = new THREE.AmbientLight(0x444444);
scene.add(ambient);
// console.log(scene)
// console.log(scene.children)

/**
 * 相机设置
 */
var width = window.innerWidth; //窗口宽度
var height = window.innerHeight; //窗口高度
var k = width / height; //窗口宽高比
var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
//创建相机对象
var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 2000);
camera.position.set(100, 100, 100); // 设置相机位置
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

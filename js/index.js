window.addEventListener("DOMContentLoaded", init);

function init() {
  const width = 960;
  const height = 540;

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#myCanvas")
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // シーンを作成
  const scene = new THREE.Scene();

  // // カメラを作成
  // const camera = new THREE.PerspectiveCamera(
  //   45,
  //   width / height,
  //   1,
  //   10000
  // );
  // camera.position.set(0, 0, +1000);
  
  // カメラを作成
  const camera = new THREE.PerspectiveCamera(/*省略*/);
  // カメラの初期座標を設定
  camera.position.set(0, 0, 1500);
  
  // カメラコントローラーを作成
  const controls = new THREE.OrbitControls(camera, document.body);
  
  // 滑らかにカメラコントローラーを制御する
  controls.enableDamping = true;
  controls.dampingFactor = 0.2;
  tick();
  
  // 毎フレーム時に実行されるループイベントです
  function tick() {
    // カメラコントローラーを更新
    controls.update();
    
    // レンダリング
    renderer.render(scene, camera);
    
    requestAnimationFrame(tick);
  }

  // アートボード（作品の展示場）の作成
  const frame_geometry = new THREE.BoxGeometry( 500, 500, 30 );
  const frame_material = new THREE.MeshLambertMaterial({color: 0x6699FF});
  const frame = new THREE.Mesh( frame_geometry, frame_material );
  scene.add( frame );
  frame.position.set( 0, 0, 15); //アートボードの位置変更

  // 壁の作成
  const wall_geometry = new THREE.PlaneGeometry( width*2, height*2);
  const wall_material = new THREE.MeshLambertMaterial({color: 0xFFFFFF, side: THREE.DoubleSide});
  const wall = new THREE.Mesh( wall_geometry, wall_material );
  scene.add( wall );

  // 床の作成
  const floor_geometry = new THREE.PlaneGeometry( 2000, 1000 );//width*2, height*2
  const floor_material = new THREE.MeshLambertMaterial({color: 0xa0522d});
  const floor = new THREE.Mesh( floor_geometry, floor_material );
  scene.add( floor );
  floor.position.set( 0, -400, 500); //床の位置変更
  floor.rotation.set( -Math.PI/2, 0, 0); //床の回転（壁だったものを床にする）

  // // 平行光源
  // const light = new THREE.DirectionalLight(0xffffff);
  // light.intensity = 2; // 光の強さを倍に
  // light.position.set(1, 1, 1);
  // // シーンに追加
  // scene.add(light);

  const light = new THREE.AmbientLight(0xFFFFFF, 1.0);
  scene.add(light);

  // 初回実行
  tick();

  function tick() {
    requestAnimationFrame(tick);

    // 箱を回転させる
    // box.rotation.x += 0.01;
    // box.rotation.y += 0.01;

    // レンダリング
    renderer.render(scene, camera);
  }




  /* //  //  //  //  //  //  //  //  //
  // 画面サイズに合わせて  リサイズ処理 //
  //  //  //  //  //  //  //  //  // */

  // 初期化のために実行
  onResize();
  // リサイズイベント発生時に実行
  window.addEventListener('resize', onResize);
  
  function onResize() {
    // サイズを取得
    const width = window.innerWidth;
    const height = window.innerHeight;

    // レンダラーのサイズを調整する
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    
    // カメラのアスペクト比を正す
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
  // // // // // // // // // // // // // // //
}
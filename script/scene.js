        const container = document.getElementById( 'canvas' );
        if(mobile) container.style.height = `${document.body.offsetHeight}px`;
        let camera, scene, renderer;
        let uniforms;
        init = () => {
        	scene = new THREE.Scene();
            camera = new THREE.Camera();
            camera.position.z = 1;

            renderer = new THREE.WebGLRenderer();
            renderer.setPixelRatio( window.devicePixelRatio );
            container.appendChild( renderer.domElement );

            var geometry = new THREE.PlaneBufferGeometry( 2, 2 );

            uniforms = {
                u_time: { type: "f", value: 1.0 },
                u_resolution: { type: "v2", value: new THREE.Vector2() },
                u_mouse: { type: "v2", value: new THREE.Vector2() }
            };

            var material = new THREE.ShaderMaterial( {
                uniforms: uniforms,
                vertexShader: document.getElementById( 'vertexShader' ).textContent,
                fragmentShader: document.getElementById( 'fragmentShader' ).textContent
            } );

            var mesh = new THREE.Mesh( geometry, material );
            scene.add( mesh );
            onWindowResize();
            window.addEventListener( 'resize', onWindowResize, false );

            document.onmousemove = (e) =>{
              uniforms.u_mouse.value.x = e.pageX
              uniforms.u_mouse.value.y = e.pageY
            }
        }

        onWindowResize = ( event ) => {
            renderer.setSize( container.offsetWidth, container.offsetHeight );
            uniforms.u_resolution.value.x = renderer.domElement.width;
            uniforms.u_resolution.value.y = renderer.domElement.height;
        }

        animate = () => {
            requestAnimationFrame( animate );
            render();
        }

        render = () => {
            uniforms.u_time.value += 0.05;
            renderer.render( scene, camera );
        }

        init();
        animate();
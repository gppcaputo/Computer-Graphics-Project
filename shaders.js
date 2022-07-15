// World shaders ??
const vertShader = `
  attribute vec4 a_position;
  attribute vec2 a_texcoord;
  attribute vec3 a_normal;

  uniform mat4 u_projection;
  uniform mat4 u_view;
  uniform mat4 u_model;

  varying vec3 v_normal;
  varying vec2 v_texcoord;

  void main() {
    gl_Position = u_projection * u_view * u_model * a_position;
    v_normal = mat3(u_model) * a_normal;
    
    v_texcoord = a_texcoord;
  }
  `;

const fragShader = `
  precision mediump float;

  varying vec3 v_normal;
  varying vec2 v_texcoord;

  uniform vec4 u_diffuse;
  uniform vec3 u_lightDirection;
  
  uniform sampler2D u_texture;

  void main () {
    vec3 normal = normalize(v_normal);
    float fakeLight = dot(u_lightDirection, normal) * .5 + .5;
    // gl_FragColor = vec4(u_diffuse.rgb * fakeLight, u_diffuse.a);
    gl_FragColor = texture2D(u_texture, v_texcoord);
  }
  `;


//SKYBOX SHADERS - PROVA
const skyVertShader = `
    attribute vec4 a_position;
    
    varying vec4 v_position;
    
    void main() {
        v_position = a_position;  
        gl_Position = a_position;
        gl_Position.z = 1.0;
    }
   `;

const skyFragShader = `
    precision mediump float;
    
    uniform samplerCube u_skybox;
    uniform mat4 u_viewDirectionProjectionInverse; //?
    
    varying vec4 v_position;
    
    void main() {
        vec4 t = u_viewDirectionProjectionInverse * v_position;
        gl_FragColor = textureCube(u_skybox, normalize(t.xyz/t.w));
    }
    `;
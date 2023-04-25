#version 300 es

in vec2 a_position;
in vec2 a_texCoord;

 uniform mat3 u_matrix;// need to init

// uniform vec2 u_resolution;

out vec2 v_texCoord;

void main() {


  gl_Position = vec4((u_matrix * vec3(a_position, 1)).xy, 0, 1);

  v_texCoord =  vec2(a_texCoord.x, a_texCoord.y);
}
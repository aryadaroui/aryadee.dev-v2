#version 300 es

precision highp float;

uniform sampler2D photo;

in vec2 v_texCoord;

out vec4 response;

uniform float xs_tone_curve[7];
uniform float ys_tone_curve[7];
uniform float c1s_tone_curve[7];
uniform float c2s_tone_curve[6];
uniform float c3s_tone_curve[6];

uniform float xs_tone_response[7];
uniform float ys_tone_response[7];
uniform float c1s_tone_response[7];
uniform float c2s_tone_response[6];
uniform float c3s_tone_response[6];

uniform float xs_hue_shift[13];
uniform float ys_hue_shift[13];
uniform float c1s_hue_shift[13];
uniform float c2s_hue_shift[12];
uniform float c3s_hue_shift[12];

uniform float xs_saturation_shift[13];
uniform float ys_saturation_shift[13];
uniform float c1s_saturation_shift[13];
uniform float c2s_saturation_shift[12];
uniform float c3s_saturation_shift[12];

uniform float xs_value_shift[13];
uniform float ys_value_shift[13];
uniform float c1s_value_shift[13];
uniform float c2s_value_shift[12];
uniform float c3s_value_shift[12];

uniform float xs_alpha_shift[13];
uniform float ys_alpha_shift[13];
uniform float c1s_alpha_shift[13];
uniform float c2s_alpha_shift[12];
uniform float c3s_alpha_shift[12];

uniform float camera_x;
uniform float camera_y;
uniform float camera_zoom;

uniform float grain_size;
uniform float offset;
uniform float intensity;


vec4 texel;

///
/* https://www.shadertoy.com/view/XsX3zB
 *
 * The MIT License
 * Copyright © 2013 Nikita Miropolskiy
 * 
 * ( license has been changed from CCA-NC-SA 3.0 to MIT
 *
 *   but thanks for attributing your source code when deriving from this sample 
 *   with a following link: https://www.shadertoy.com/view/XsX3zB )
 *
 * ~
 * ~ if you're looking for procedural noise implementation examples you might 
 * ~ also want to look at the following shaders:
 * ~ 
 * ~ Noise Lab shader by candycat: https://www.shadertoy.com/view/4sc3z2
 * ~
 * ~ Noise shaders by iq:
 * ~     Value    Noise 2D, Derivatives: https://www.shadertoy.com/view/4dXBRH
 * ~     Gradient Noise 2D, Derivatives: https://www.shadertoy.com/view/XdXBRH
 * ~     Value    Noise 3D, Derivatives: https://www.shadertoy.com/view/XsXfRH
 * ~     Gradient Noise 3D, Derivatives: https://www.shadertoy.com/view/4dffRH
 * ~     Value    Noise 2D             : https://www.shadertoy.com/view/lsf3WH
 * ~     Value    Noise 3D             : https://www.shadertoy.com/view/4sfGzS
 * ~     Gradient Noise 2D             : https://www.shadertoy.com/view/XdXGW8
 * ~     Gradient Noise 3D             : https://www.shadertoy.com/view/Xsl3Dl
 * ~     Simplex  Noise 2D             : https://www.shadertoy.com/view/Msf3WH
 * ~     Voronoise: https://www.shadertoy.com/view/Xd23Dh
 * ~ 
 *
 */

/* discontinuous pseudorandom uniformly distributed in [-0.5, +0.5]^3 */
vec3 random3(vec3 c) {
	float j = 4096.0 * sin(dot(c, vec3(17.0, 59.4, 15.0)));
	vec3 r;
	r.z = fract(512.0 * j);
	j *= .125;
	r.x = fract(512.0 * j);
	j *= .125;
	r.y = fract(512.0 * j);
	return r - 0.5;
}

/* skew constants for 3d simplex functions */
const float F3 = 0.3333333;
const float G3 = 0.1666667;

/* 3d simplex noise */
float simplex3d(vec3 p) {
	 /* 1. find current tetrahedron T and it's four vertices */
	 /* s, s+i1, s+i2, s+1.0 - absolute skewed (integer) coordinates of T vertices */
	 /* x, x1, x2, x3 - unskewed coordinates of p relative to each of T vertices*/

	 /* calculate s and x */
	vec3 s = floor(p + dot(p, vec3(F3)));
	vec3 x = p - s + dot(s, vec3(G3));

	 /* calculate i1 and i2 */
	vec3 e = step(vec3(0.0), x - x.yzx);
    //  e.z = min(e.z, 3.0 - dot(e, vec3(1.0)));
	vec3 i1 = e * (1.0 - e.zxy);
	vec3 i2 = 1.0 - e.zxy * (1.0 - e);

	 /* x1, x2, x3 */
	vec3 x1 = x - i1 + G3;
	vec3 x2 = x - i2 + 2.0 * G3;
	vec3 x3 = x - 1.0 + 3.0 * G3;

	 /* 2. find four surflets and store them in d */
	vec4 w, d;

	 /* calculate surflet weights */
	w.x = dot(x, x);
	w.y = dot(x1, x1);
	w.z = dot(x2, x2);
	w.w = dot(x3, x3);

	 /* w fades from 0.6 at the center of the surflet to 0.0 at the margin */
	w = max(0.6 - w, 0.0);

	 /* calculate surflet components */
	d.x = dot(random3(s), x);
	d.y = dot(random3(s + i1), x1);
	d.z = dot(random3(s + i2), x2);
	d.w = dot(random3(s + 1.0), x3);

	 /* multiply d by w^4 */
	w *= w;
	w *= w;
	d *= w;

	 /* 3. return the sum of the four surflets */
	return dot(d, vec4(52.0));
}

float interp_tone_curve(float x);
float interp_tone_response(float x);
float interp_hue_shift(float x);
float interp_saturation_shift(float x);
float interp_value_shift(float x);
float interp_alpha_shift(float x);

vec3 hsv_tex;
vec3 rgb_tex;

const float EPSILON = 1e-10;


vec3 hsl2rgb2(vec3 HSL) {
	float R = abs(HSL.x * 6.0 - 3.0) - 1.0;
	float G = 2.0 - abs(HSL.x * 6.0 - 2.0);
	float B = 2.0 - abs(HSL.x * 6.0 - 4.0);
	vec3 RGB = clamp(vec3(R, G, B), 0.0, 1.0);
	float C = (1.0 - abs(2.0 * HSL.z - 1.0)) * HSL.y;
	return (RGB - 0.5) * C + HSL.z;
}


vec3 HUEtoRGB( float hue)
{
    // Hue [0..1] to RGB [0..1]
    // See http://www.chilliant.com/rgb2hsv.html
    vec3 rgb = abs(hue * 6. - vec3(3, 2, 4)) * vec3(1, -1, -1) + vec3(-1, 2, 2);
    return clamp(rgb, 0., 1.);
}

vec3 RGBtoHCV(in vec3 rgb)
{
    // RGB [0..1] to Hue-Chroma-Value [0..1]
    // Based on work by Sam Hocevar and Emil Persson
    vec4 p = (rgb.g < rgb.b) ? vec4(rgb.bg, -1., 2. / 3.) : vec4(rgb.gb, 0., -1. / 3.);
    vec4 q = (rgb.r < p.x) ? vec4(p.xyw, rgb.r) : vec4(rgb.r, p.yzx);
    float c = q.x - min(q.w, q.y);
    float h = abs((q.w - q.y) / (6. * c + EPSILON) + q.z);
    return vec3(h, c, q.x);
}

vec3 hsl2rgb3(vec3 hsl)
{
    // Hue-Saturation-Lightness [0..1] to RGB [0..1]
    vec3 rgb = HUEtoRGB(hsl.x);
    float c = (1. - abs(2. * hsl.z - 1.)) * hsl.y;
    return (rgb - 0.5) * c + hsl.z;
}

vec3 rgb2hsl3(in vec3 rgb)
{
    // RGB [0..1] to Hue-Saturation-Lightness [0..1]
    vec3 hcv = RGBtoHCV(rgb);
    float z = hcv.z - hcv.y * 0.5;
    float s = hcv.y / (1. - abs(z * 2. - 1.) + EPSILON);
    return vec3(hcv.x, s, z);
}



vec3 hsl2rgb( vec3 c )
{
    vec3 rgb = clamp( abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0 );

    return c.z + c.y * (rgb-0.5)*(1.0-abs(2.0*c.z-1.0));
}

vec3 rgb2hsl(vec3 c) {
	float h = 0.0;
	float s = 0.0;
	float l = 0.0;
	float r = c.r;
	float g = c.g;
	float b = c.b;
	float cMin = min(r, min(g, b));
	float cMax = max(r, max(g, b));

	l = (cMax + cMin) / 2.0;
	if(cMax > cMin) {
		float cDelta = cMax - cMin;

        //s = l < .05 ? cDelta / ( cMax + cMin ) : cDelta / ( 2.0 - ( cMax + cMin ) ); Original
		s = l < .0 ? cDelta / (cMax + cMin) : cDelta / (2.0 - (cMax + cMin));

		if(r == cMax) {
			h = (g - b) / cDelta;
		} else if(g == cMax) {
			h = 2.0 + (b - r) / cDelta;
		} else {
			h = 4.0 + (r - g) / cDelta;
		}

		if(h < 0.0) {
			h += 6.0;
		}
		h = h / 6.0;
	}
	return vec3(h, s, l);
}

vec3 rgb2hsv(vec3 c) {
	vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
	vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
	vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

	float d = q.x - min(q.w, q.y);
	float e = 1.0e-10;
	return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c) {
	vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
	vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
	return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {

	float grain_value;
	float seed = 1.0;
	float adjust_grain_size = grain_size * camera_zoom;
	vec3 toned_rgb;
	vec2 p = vec2(gl_FragCoord.x + (camera_x * camera_zoom), gl_FragCoord.y - (camera_y * camera_zoom));

	texel = texture(photo, v_texCoord);
	toned_rgb = vec3(
		interp_tone_curve(texel.r),
		interp_tone_curve(texel.g),
		interp_tone_curve(texel.b)
	);


	// // // HSV
	hsv_tex = rgb2hsv(toned_rgb);
	grain_value = simplex3d(vec3(p / adjust_grain_size, seed * grain_size * camera_zoom * 77.7));
	grain_value = offset + intensity * grain_value;

	rgb_tex = hsv2rgb(vec3(
		hsv_tex.x + interp_hue_shift(hsv_tex.x),
		clamp(hsv_tex.y + interp_saturation_shift(hsv_tex.x), 0.0, 1.0), 
		clamp(hsv_tex.z + interp_value_shift(hsv_tex.x) - (interp_tone_response(hsv_tex.z) * grain_value), 0.0, 1.0)
	));

	response = vec4(rgb_tex.r, rgb_tex.g, rgb_tex.b, texel.a + interp_alpha_shift(hsv_tex.x));
}

float interp_tone_curve(float x) {
	float diff;
	float diffSq;
	int i;
	i = int(floor(x * 6.0));

	diff = x - xs_tone_curve[i];
	diffSq = diff * diff;

	return ys_tone_curve[i] + c1s_tone_curve[i] * diff + c2s_tone_curve[i] * diffSq + c3s_tone_curve[i] * diff * diffSq;
}

float interp_tone_response(float x) {
	float diff;
	float diffSq;
	int i;
	i = int(floor(x * 6.0));

	diff = x - xs_tone_response[i];
	diffSq = diff * diff;

	return ys_tone_response[i] + c1s_tone_response[i] * diff + c2s_tone_response[i] * diffSq + c3s_tone_response[i] * diff * diffSq;
}

float interp_hue_shift(float x) {
	float diff;
	float diffSq;
	int i;
	i = int(floor(x * 12.0));

	diff = x - xs_hue_shift[i];
	diffSq = diff * diff;

	return ys_hue_shift[i] + c1s_hue_shift[i] * diff + c2s_hue_shift[i] * diffSq + c3s_hue_shift[i] * diff * diffSq;
}

float interp_saturation_shift(float x) {
	float diff;
	float diffSq;
	int i;
	i = int(floor(x * 12.0));

	diff = x - xs_saturation_shift[i];
	diffSq = diff * diff;

	return ys_saturation_shift[i] + c1s_saturation_shift[i] * diff + c2s_saturation_shift[i] * diffSq + c3s_saturation_shift[i] * diff * diffSq;
}

float interp_value_shift(float x) {
	float diff;
	float diffSq;
	int i;
	i = int(floor(x * 12.0));

	diff = x - xs_value_shift[i];
	diffSq = diff * diff;

	return ys_value_shift[i] + c1s_value_shift[i] * diff + c2s_value_shift[i] * diffSq + c3s_value_shift[i] * diff * diffSq;
}

float interp_alpha_shift(float x) {
	float diff;
	float diffSq;
	int i;
	i = int(floor(x * 12.0));

	diff = x - xs_alpha_shift[i];
	diffSq = diff * diff;

	return ys_alpha_shift[i] + c1s_alpha_shift[i] * diff + c2s_alpha_shift[i] * diffSq + c3s_alpha_shift[i] * diff * diffSq;
}
/**
 * CSS 3D engine
 *
 * @category    css3d
 * @package     css3d.matrix4
 * @author      Jan Fischer, bitWorking <info@bitworking.de>
 * @copyright   2014 Jan Fischer
 * @license     http://www.opensource.org/licenses/mit-license.html  MIT License
 */

/**
 * 
 * @namespace
 */
css3d.matrix4 = {

    D2R : (Math.PI/180),

    /**
     * 
     * @returns {Array}
     */
    identity : function()
    {
        return [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
    },

    /**
     * 
     * @param {Array} a
     * @param {Array} b
     * @returns {Array}
     */
    multiply : function(a, b)
    {
        return [
            a[0] * b[0] + a[1] * b[4] + a[2] * b[8] + a[3] * b[12],
            a[0] * b[1] + a[1] * b[5] + a[2] * b[9] + a[3] * b[13],
            a[0] * b[2] + a[1] * b[6] + a[2] * b[10] + a[3] * b[14],
            a[0] * b[3] + a[1] * b[7] + a[2] * b[11] + a[3] * b[15],

            a[4] * b[0] + a[5] * b[4] + a[6] * b[8] + a[7] * b[12],
            a[4] * b[1] + a[5] * b[5] + a[6] * b[9] + a[7] * b[13],
            a[4] * b[2] + a[5] * b[6] + a[6] * b[10] + a[7] * b[14],
            a[4] * b[3] + a[5] * b[7] + a[6] * b[11] + a[7] * b[15],

            a[8] * b[0] + a[9] * b[4] + a[10] * b[8] + a[11] * b[12],
            a[8] * b[1] + a[9] * b[5] + a[10] * b[9] + a[11] * b[13],
            a[8] * b[2] + a[9] * b[6] + a[10] * b[10] + a[11] * b[14],
            a[8] * b[3] + a[9] * b[7] + a[10] * b[11] + a[11] * b[15],

            a[12] * b[0] + a[13] * b[4] + a[14] * b[8] + a[15] * b[12],
            a[12] * b[1] + a[13] * b[5] + a[14] * b[9] + a[15] * b[13],
            a[12] * b[2] + a[13] * b[6] + a[14] * b[10] + a[15] * b[14],
            a[12] * b[3] + a[13] * b[7] + a[14] * b[11] + a[15] * b[15]
        ];
    },

    /**
     * 
     * @param {Number} angle
     * @returns {Array}
     */
    rotationX : function(angle)
    {
        var c = Math.cos(angle), s = Math.sin(angle);
        return [
            1, 0,  0, 0,
            0, c, -s, 0,
            0, s,  c, 0,
            0, 0,  0, 1
        ];
    },

    /**
     * 
     * @param {Number} angle
     * @returns {Array}
     */
    rotationY : function(angle)
    {
        var c = Math.cos(angle), s = Math.sin(angle);
        return [
            c, 0, s, 0,
            0, 1, 0, 0,
           -s, 0, c, 0,
            0, 0, 0, 1
        ];
    },

    /**
     * 
     * @param {Number} angle
     * @returns {Array}
     */
    rotationZ : function(angle)
    {
        var c = Math.cos(angle), s = Math.sin(angle);
        return [
            c, -s, 0, 0,
            s,  c, 0, 0,
            0,  0, 1, 0,
            0,  0, 0, 1
        ];
    },

    /**
     * 
     * @param {css3d.vector3} axis
     * @param {Number} angle
     * @returns {Array}
     */
    rotationAxis : function(axis, angle)
    {
        var c = Math.cos(angle);
        var s = Math.sin(angle);
        var t = 1 - c;
        var x = axis.x, y = axis.y, z = axis.z;
        var tx = t * x, ty = t * y;
        return [
            tx * x + c,     tx * y - s * z, tx * z + s * y, 0,
            tx * y + s * z, ty * y + c,     ty * z - s * x, 0,
            tx * z - s * y, ty * z + s * x, t * z * z + c,  0,
            0,              0,              0,              1
        ];
    },

    /**
     * 
     * @param {Number} x
     * @param {Number} y
     * @param {Number} z
     * @returns {Array}
     */
    scale : function(x, y, z)
    {
        return [
            x, 0, 0, 0,
            0, y, 0, 0,
            0, 0, z, 0,
            0, 0, 0, 1
        ];
    },

    /**
     * 
     * @param {Number} x
     * @param {Number} y
     * @param {Number} z
     * @returns {Array}
     */
    translation : function(x, y, z)
    {
        return [
            1, 0, 0, x,
            0, 1, 0, y,
            0, 0, 1, z,
            0, 0, 0, 1
        ];
    },

    /**
     * 
     * @param {Array} matrix
     * @returns {css3d.vector3}
     */
    right : function(matrix)
    {
        return new css3d.vector3(matrix[0], matrix[4], matrix[8]);
    },

    /**
     * 
     * @param {Array} matrix
     * @returns {css3d.vector3}
     */
    up : function(matrix)
    {
        return new css3d.vector3(-matrix[1], -matrix[5], -matrix[9]);
    },

    /**
     * 
     * @param {Array} matrix
     * @returns {css3d.vector3}
     */
    back : function(matrix)
    {
        return new css3d.vector3(matrix[2], matrix[6], matrix[10]);
    },
    
    /**
     * 
     * @param {Array} matrix
     * @returns {css3d.vector3}
     */
    forward : function(matrix)
    {
        return new css3d.vector3(-matrix[2], -matrix[6], -matrix[10]);
    },

    /**
     * 
     * @param {Number} left
     * @param {Number} right
     * @param {Number} bottom
     * @param {Number} top
     * @param {Number} near
     * @param {Number} far
     * @returns {Array}
     */
    frustum : function(left, right, bottom, top, near, far)
    {
        var rMl = right - left;
        var tMb = top - bottom;
        var fMn = far - near;
        var n2 = 2 * near;
        return [
            n2/rMl, 0,      (right+left)/rMl, 0,
            0,      n2/tMb, (top+bottom)/tMb, 0,
            0,      0,      -(far+near)/fMn,  -2*(far*near)/fMn,
            0,      0,      -1,               0

        ];
    },

    /**
     * 
     * @param {Number} fov
     * @param {Number} width
     * @param {Number} height
     * @param {Number} near
     * @param {Number} far
     * @returns {Array}
     */
    projection : function(fov, width, height, near, far)
    {
        var radians = fov * this.D2R;
    	var halfHeight = (Math.tan(radians/2)*near);
    	var halfAspectRatio = halfHeight*(width/height);
    	return this.frustum(-halfAspectRatio, halfAspectRatio, -halfHeight, halfHeight, near, far);
    },

    /**
     * 
     * @param {css3d.vector3} eye
     * @param {css3d.vector3} target
     * @param {css3d.vector3} up
     * @returns {Array}
     */
    lookAt : function(eye, target, up)
    {
        //http://msdn.microsoft.com/en-us/library/windows/desktop/bb281710(v=vs.85).aspx

        var _target = new css3d.vector3(target.x, target.y, target.z);
        var _eye = new css3d.vector3(eye.x, eye.y, eye.z);

        var zaxis = _eye.sub(_target).normalize();
        var xaxis = css3d.vector3.prototype.cross(zaxis, up).normalize();
        var yaxis = css3d.vector3.prototype.cross(zaxis, xaxis);
        /*
        return [
            xaxis.x, yaxis.x, zaxis.x, eye.x,
            xaxis.y, yaxis.y, zaxis.y, eye.y,
            xaxis.z, yaxis.z, zaxis.z, eye.z,
            0,       0,       0,       1
        ];
        */
        return [
            xaxis.x, yaxis.x, zaxis.x, 0,
            xaxis.y, yaxis.y, zaxis.y, 0,
            xaxis.z, yaxis.z, zaxis.z, 0,
            0,       0,       0,       1
        ];
    },

    /**
     * 
     * @param {Array} m
     * @returns {Array}
     */
    transpose : function(m)
    {
        return [
            m[0], m[4], m[8],  m[12],
            m[1], m[5], m[9],  m[13],
            m[2], m[6], m[10], m[14],
            m[3], m[7], m[11], m[15]
        ];
    },
 
    /**
     * Works if matrix only contains rotation and translation part
     * 
     * @param {Array} m
     * @returns {Array}
     */
    fastInverse : function(m)
    {
        // http://harinadha.wordpress.com/tag/model-view-matrix-inverse/

        var x = -m[3]*m[0] + -m[7]*m[4] + -m[11]*m[8];
        var y = -m[3]*m[1] + -m[7]*m[5] + -m[11]*m[9];
        var z = -m[3]*m[2] + -m[7]*m[6] + -m[11]*m[10];

        return [
            m[0], m[4], m[8],  x,
            m[1], m[5], m[9],  y,
            m[2], m[6], m[10], z,
            0,    0,    0,     1
        ];
    },

    /**
     * Matrix has to be a rotation matrix
     * 
     * @param {Array} m
     * @returns {Object} {'axis':{css3d.vector3}, 'angle':{Number}}
     */
    toAxisAngle : function(m)
    {              
        var quaternion = css3d.quaternion.prototype.fromMatrix4(m);
        return quaternion.toAxisAngle();
    },
    
    /**
     * 
     * @param {Array} m
     * @returns {String}
     */
    toString : function(m)
    {
        var out = '';
        out += m[0].toFixed(2)+',\t'+m[1].toFixed(2)+',\t'+m[2].toFixed(2)+',\t'+m[3].toFixed(2)+','+"\n";
        out += m[4].toFixed(2)+',\t'+m[5].toFixed(2)+',\t'+m[6].toFixed(2)+',\t'+m[7].toFixed(2)+','+"\n";
        out += m[8].toFixed(2)+',\t'+m[9].toFixed(2)+',\t'+m[10].toFixed(2)+',\t'+m[11].toFixed(2)+','+"\n";
        out += m[12].toFixed(2)+',\t'+m[13].toFixed(2)+',\t'+m[14].toFixed(2)+',\t'+m[15].toFixed(2);
        out += '';
        return out;
    }
    
    



};

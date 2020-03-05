DataView.prototype.getUint64||(DataView.prototype.getUint64=function(e,t){const n=this.getUint32(e,t),r=this.getUint32(e+4,t),a=t?n+2**32*r:2**32*n+r;return Number.isSafeInteger(a)||console.warn(a,"exceeds MAX_SAFE_INTEGER. Precision may be lost"),a}),DataView.prototype.getUint64||(DataView.prototype.getInt64=function(e,t){const n=this.getInt32(e,t),r=this.getInt32(e+4,t),a=t?n+2**32*r:2**32*n+r;return Number.isSafeInteger(a)||console.warn(a,"exceeds MAX_SAFE_INTEGER. Precision may be lost"),a});const $ec1c7639789ac6e004f20c4876f$var$typeMap={x:{length:1},b:{length:1},c:{length:1,fn:"Int8",array:Int8Array},C:{length:1,fn:"Uint8",array:Uint8Array},a:{length:1,fn:"Uint8"},A:{length:1,fn:"Uint8"},s:{length:2,fn:"Int16",array:Int16Array},S:{length:2,fn:"Uint16",array:Uint16Array},i:{length:4,fn:"Int32",array:Int32Array},I:{length:4,fn:"Uint32",array:Uint32Array},l:{length:4,fn:"Int64"},L:{length:4,fn:"Uint64"},n:{length:2,fn:"Uint16",little:!1},N:{length:4,fn:"Uint32",little:!1},f:{length:4,fn:"Float32",array:Float32Array},d:{length:8,fn:"Float64",array:Float64Array}},$ec1c7639789ac6e004f20c4876f$var$decode=e=>(new TextDecoder).decode(e);function $ec1c7639789ac6e004f20c4876f$var$binarySlice(e,t,n){return n&&!isNaN(n)||(n=8-t),e>>8-(t+n)&2**n-1}function $ec1c7639789ac6e004f20c4876f$export$default(e,t,n=0){const r={};var a;Array.isArray(t)&&(t=Uint8Array.from(t)),"string"==typeof t?t=(a=t,(new TextEncoder).encode(a)).buffer:"number"==typeof t?t=(0|t)!==t?Float64Array.from([t]).buffer:Int32Array.from([t]).buffer:ArrayBuffer.isView(t)&&(t=t.buffer);const c=new RegExp("([aAZbBhHcCWqQnNvVuUx@]|[sSlLiI][\\!><]?)(?:([\\d*]+)|(?:\\[(.*)\\]))?(?:\\$([a-zA-Z0-9_]+)\\b)?","g");let f=[],i=0;const o="<"===e[0];let s=-1;for(;f=c.exec(e);){s++;const e=f[4]||s;let a=o,c=null;c=$ec1c7639789ac6e004f20c4876f$var$typeMap[f[2]]?$ec1c7639789ac6e004f20c4876f$var$typeMap[f[2]].length:parseInt(f[2]||1);let l=f[1];2===l.length&&(a="<"===l[1],l=l[0]);const y=$ec1c7639789ac6e004f20c4876f$var$typeMap[l];if(!y)throw new Error(`unsupported type "${l}"`);void 0!==y.little&&(a=y.little);const g=y.length;let $="b"===l?1:g*c;if(isNaN(c)&&($=t.byteLength-n),n+$>t.byteLength)return r;const h=new DataView(t,n,$);switch("b"!==l&&(i=0),l){case"b":l=h.getUint8(0,a),r[e]=$ec1c7639789ac6e004f20c4876f$var$binarySlice(l,i,c),r[e],i+=c,i>7&&(n++,i=0);break;case"x":s--,n+=$;break;case"a":case"A":r[e]=$ec1c7639789ac6e004f20c4876f$var$decode(h).padEnd(c,"A"===l?" ":"\0"),"a"===l&&-1!==r[e].indexOf("\0")&&(r[e]=r[e].substring(0,r[e].indexOf("\0"))),n+=$;break;default:r[e]=c>1?new y.array(h.buffer.slice(n,n+$)):h[`get${y.fn}`](0,a),n+=$}}return r.__offset=n,r}exports.Unpack=class{constructor(e){this.data=e,this.offset=0}parse(e){const{__offset:t,...n}=$ec1c7639789ac6e004f20c4876f$export$default(e,n,this.offset);return this.offset=t,n}},exports.default=$ec1c7639789ac6e004f20c4876f$export$default;
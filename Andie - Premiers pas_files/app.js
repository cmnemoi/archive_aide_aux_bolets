(function (console, $hx_exports, $global) { "use strict";
$hx_exports.mt = $hx_exports.mt || {};
$hx_exports.mt.js = $hx_exports.mt.js || {};
var $hxClasses = {},$estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var DateTools = function() { };
$hxClasses["DateTools"] = DateTools;
DateTools.__name__ = true;
DateTools.delta = function(d,t) {
	var t1 = d.getTime() + t;
	var d1 = new Date();
	d1.setTime(t1);
	return d1;
};
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = true;
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) return this.r.m[n]; else throw new js__$Boot_HaxeError("EReg::matched");
	}
	,__class__: EReg
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = true;
HxOverrides.strDate = function(s) {
	var _g = s.length;
	switch(_g) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k1 = s.split("-");
		return new Date(k1[0],k1[1] - 1,k1[2],0,0,0);
	case 19:
		var k2 = s.split(" ");
		var y = k2[0].split("-");
		var t = k2[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw new js__$Boot_HaxeError("Invalid date format : " + s);
	}
};
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
var Lambda = function() { };
$hxClasses["Lambda"] = Lambda;
Lambda.__name__ = true;
Lambda.exists = function(it,f) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
};
Lambda.filter = function(it,f) {
	var l = new List();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) l.add(x);
	}
	return l;
};
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = true;
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,iterator: function() {
		return new _$List_ListIterator(this.h);
	}
	,join: function(sep) {
		var s = new StringBuf();
		var first = true;
		var l = this.h;
		while(l != null) {
			if(first) first = false; else if(sep == null) s.b += "null"; else s.b += "" + sep;
			s.add(l[0]);
			l = l[1];
		}
		return s.b;
	}
	,__class__: List
};
var _$List_ListIterator = function(head) {
	this.head = head;
	this.val = null;
};
$hxClasses["_List.ListIterator"] = _$List_ListIterator;
_$List_ListIterator.__name__ = true;
_$List_ListIterator.prototype = {
	hasNext: function() {
		return this.head != null;
	}
	,next: function() {
		this.val = this.head[0];
		this.head = this.head[1];
		return this.val;
	}
	,__class__: _$List_ListIterator
};
Math.__name__ = true;
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = true;
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
Std.parseFloat = function(x) {
	return parseFloat(x);
};
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = true;
StringBuf.prototype = {
	add: function(x) {
		this.b += Std.string(x);
	}
	,__class__: StringBuf
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = true;
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
};
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c > 8 && c < 14 || c == 32;
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = true;
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
};
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
};
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw new js__$Boot_HaxeError("No such constructor " + constr);
	if(Reflect.isFunction(f)) {
		if(params == null) throw new js__$Boot_HaxeError("Constructor " + constr + " need parameters");
		return Reflect.callMethod(e,f,params);
	}
	if(params != null && params.length != 0) throw new js__$Boot_HaxeError("Constructor " + constr + " does not need parameters");
	return f;
};
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.slice();
};
var haxe_IMap = function() { };
$hxClasses["haxe.IMap"] = haxe_IMap;
haxe_IMap.__name__ = true;
var haxe_Http = function(url) {
	this.url = url;
	this.headers = new List();
	this.params = new List();
	this.async = true;
	this.withCredentials = false;
};
$hxClasses["haxe.Http"] = haxe_Http;
haxe_Http.__name__ = true;
haxe_Http.prototype = {
	setParameter: function(param,value) {
		this.params = Lambda.filter(this.params,function(p) {
			return p.param != param;
		});
		this.params.push({ param : param, value : value});
		return this;
	}
	,request: function(post) {
		var me = this;
		me.responseData = null;
		var r = this.req = js_Browser.createXMLHttpRequest();
		var onreadystatechange = function(_) {
			if(r.readyState != 4) return;
			var s;
			try {
				s = r.status;
			} catch( e ) {
				if (e instanceof js__$Boot_HaxeError) e = e.val;
				s = null;
			}
			if(s != null) {
				var protocol = window.location.protocol.toLowerCase();
				var rlocalProtocol = new EReg("^(?:about|app|app-storage|.+-extension|file|res|widget):$","");
				var isLocal = rlocalProtocol.match(protocol);
				if(isLocal) if(r.responseText != null) s = 200; else s = 404;
			}
			if(s == undefined) s = null;
			if(s != null) me.onStatus(s);
			if(s != null && s >= 200 && s < 400) {
				me.req = null;
				me.onData(me.responseData = r.responseText);
			} else if(s == null) {
				me.req = null;
				me.onError("Failed to connect or resolve host");
			} else switch(s) {
			case 12029:
				me.req = null;
				me.onError("Failed to connect to host");
				break;
			case 12007:
				me.req = null;
				me.onError("Unknown host");
				break;
			default:
				me.req = null;
				me.responseData = r.responseText;
				me.onError("Http Error #" + r.status);
			}
		};
		if(this.async) r.onreadystatechange = onreadystatechange;
		var uri = this.postData;
		if(uri != null) post = true; else {
			var _g_head = this.params.h;
			var _g_val = null;
			while(_g_head != null) {
				var p;
				p = (function($this) {
					var $r;
					_g_val = _g_head[0];
					_g_head = _g_head[1];
					$r = _g_val;
					return $r;
				}(this));
				if(uri == null) uri = ""; else uri += "&";
				uri += encodeURIComponent(p.param) + "=" + encodeURIComponent(p.value);
			}
		}
		try {
			if(post) r.open("POST",this.url,this.async); else if(uri != null) {
				var question = this.url.split("?").length <= 1;
				r.open("GET",this.url + (question?"?":"&") + uri,this.async);
				uri = null;
			} else r.open("GET",this.url,this.async);
		} catch( e1 ) {
			if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
			me.req = null;
			this.onError(e1.toString());
			return;
		}
		if(!Lambda.exists(this.headers,function(h) {
			return h.header == "Content-Type";
		}) && post && this.postData == null) r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		r.withCredentials = this.withCredentials;
		var _g_head1 = this.headers.h;
		var _g_val1 = null;
		while(_g_head1 != null) {
			var h1;
			h1 = (function($this) {
				var $r;
				_g_val1 = _g_head1[0];
				_g_head1 = _g_head1[1];
				$r = _g_val1;
				return $r;
			}(this));
			r.setRequestHeader(h1.header,h1.value);
		}
		r.send(uri);
		if(!this.async) onreadystatechange(null);
	}
	,onData: function(data) {
	}
	,onError: function(msg) {
	}
	,onStatus: function(status) {
	}
	,__class__: haxe_Http
};
var haxe__$Int64__$_$_$Int64 = function(high,low) {
	this.high = high;
	this.low = low;
};
$hxClasses["haxe._Int64.___Int64"] = haxe__$Int64__$_$_$Int64;
haxe__$Int64__$_$_$Int64.__name__ = true;
haxe__$Int64__$_$_$Int64.prototype = {
	__class__: haxe__$Int64__$_$_$Int64
};
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
$hxClasses["haxe.Timer"] = haxe_Timer;
haxe_Timer.__name__ = true;
haxe_Timer.delay = function(f,time_ms) {
	var t = new haxe_Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe_Timer.prototype = {
	stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe_Timer
};
var haxe_Unserializer = function(buf) {
	this.buf = buf;
	this.length = buf.length;
	this.pos = 0;
	this.scache = [];
	this.cache = [];
	var r = haxe_Unserializer.DEFAULT_RESOLVER;
	if(r == null) {
		r = Type;
		haxe_Unserializer.DEFAULT_RESOLVER = r;
	}
	this.setResolver(r);
};
$hxClasses["haxe.Unserializer"] = haxe_Unserializer;
haxe_Unserializer.__name__ = true;
haxe_Unserializer.initCodes = function() {
	var codes = [];
	var _g1 = 0;
	var _g = haxe_Unserializer.BASE64.length;
	while(_g1 < _g) {
		var i = _g1++;
		codes[haxe_Unserializer.BASE64.charCodeAt(i)] = i;
	}
	return codes;
};
haxe_Unserializer.run = function(v) {
	return new haxe_Unserializer(v).unserialize();
};
haxe_Unserializer.prototype = {
	setResolver: function(r) {
		if(r == null) this.resolver = { resolveClass : function(_) {
			return null;
		}, resolveEnum : function(_1) {
			return null;
		}}; else this.resolver = r;
	}
	,get: function(p) {
		return this.buf.charCodeAt(p);
	}
	,readDigits: function() {
		var k = 0;
		var s = false;
		var fpos = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c != c) break;
			if(c == 45) {
				if(this.pos != fpos) break;
				s = true;
				this.pos++;
				continue;
			}
			if(c < 48 || c > 57) break;
			k = k * 10 + (c - 48);
			this.pos++;
		}
		if(s) k *= -1;
		return k;
	}
	,readFloat: function() {
		var p1 = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++; else break;
		}
		return Std.parseFloat(HxOverrides.substr(this.buf,p1,this.pos - p1));
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) throw new js__$Boot_HaxeError("Invalid object");
			if(this.buf.charCodeAt(this.pos) == 103) break;
			var k = this.unserialize();
			if(!(typeof(k) == "string")) throw new js__$Boot_HaxeError("Invalid object key");
			var v = this.unserialize();
			o[k] = v;
		}
		this.pos++;
	}
	,unserializeEnum: function(edecl,tag) {
		if(this.get(this.pos++) != 58) throw new js__$Boot_HaxeError("Invalid enum format");
		var nargs = this.readDigits();
		if(nargs == 0) return Type.createEnum(edecl,tag);
		var args = [];
		while(nargs-- > 0) args.push(this.unserialize());
		return Type.createEnum(edecl,tag,args);
	}
	,unserialize: function() {
		var _g = this.get(this.pos++);
		switch(_g) {
		case 110:
			return null;
		case 116:
			return true;
		case 102:
			return false;
		case 122:
			return 0;
		case 105:
			return this.readDigits();
		case 100:
			return this.readFloat();
		case 121:
			var len = this.readDigits();
			if(this.get(this.pos++) != 58 || this.length - this.pos < len) throw new js__$Boot_HaxeError("Invalid string length");
			var s = HxOverrides.substr(this.buf,this.pos,len);
			this.pos += len;
			s = decodeURIComponent(s.split("+").join(" "));
			this.scache.push(s);
			return s;
		case 107:
			return NaN;
		case 109:
			return -Infinity;
		case 112:
			return Infinity;
		case 97:
			var buf = this.buf;
			var a = [];
			this.cache.push(a);
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c == 104) {
					this.pos++;
					break;
				}
				if(c == 117) {
					this.pos++;
					var n = this.readDigits();
					a[a.length + n - 1] = null;
				} else a.push(this.unserialize());
			}
			return a;
		case 111:
			var o = { };
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 114:
			var n1 = this.readDigits();
			if(n1 < 0 || n1 >= this.cache.length) throw new js__$Boot_HaxeError("Invalid reference");
			return this.cache[n1];
		case 82:
			var n2 = this.readDigits();
			if(n2 < 0 || n2 >= this.scache.length) throw new js__$Boot_HaxeError("Invalid string reference");
			return this.scache[n2];
		case 120:
			throw new js__$Boot_HaxeError(this.unserialize());
			break;
		case 99:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw new js__$Boot_HaxeError("Class not found " + name);
			var o1 = Type.createEmptyInstance(cl);
			this.cache.push(o1);
			this.unserializeObject(o1);
			return o1;
		case 119:
			var name1 = this.unserialize();
			var edecl = this.resolver.resolveEnum(name1);
			if(edecl == null) throw new js__$Boot_HaxeError("Enum not found " + name1);
			var e = this.unserializeEnum(edecl,this.unserialize());
			this.cache.push(e);
			return e;
		case 106:
			var name2 = this.unserialize();
			var edecl1 = this.resolver.resolveEnum(name2);
			if(edecl1 == null) throw new js__$Boot_HaxeError("Enum not found " + name2);
			this.pos++;
			var index = this.readDigits();
			var tag = Type.getEnumConstructs(edecl1)[index];
			if(tag == null) throw new js__$Boot_HaxeError("Unknown enum index " + name2 + "@" + index);
			var e1 = this.unserializeEnum(edecl1,tag);
			this.cache.push(e1);
			return e1;
		case 108:
			var l = new List();
			this.cache.push(l);
			var buf1 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) l.add(this.unserialize());
			this.pos++;
			return l;
		case 98:
			var h = new haxe_ds_StringMap();
			this.cache.push(h);
			var buf2 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s1 = this.unserialize();
				h.set(s1,this.unserialize());
			}
			this.pos++;
			return h;
		case 113:
			var h1 = new haxe_ds_IntMap();
			this.cache.push(h1);
			var buf3 = this.buf;
			var c1 = this.get(this.pos++);
			while(c1 == 58) {
				var i = this.readDigits();
				h1.set(i,this.unserialize());
				c1 = this.get(this.pos++);
			}
			if(c1 != 104) throw new js__$Boot_HaxeError("Invalid IntMap format");
			return h1;
		case 77:
			var h2 = new haxe_ds_ObjectMap();
			this.cache.push(h2);
			var buf4 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s2 = this.unserialize();
				h2.set(s2,this.unserialize());
			}
			this.pos++;
			return h2;
		case 118:
			var d;
			if(this.buf.charCodeAt(this.pos) >= 48 && this.buf.charCodeAt(this.pos) <= 57 && this.buf.charCodeAt(this.pos + 1) >= 48 && this.buf.charCodeAt(this.pos + 1) <= 57 && this.buf.charCodeAt(this.pos + 2) >= 48 && this.buf.charCodeAt(this.pos + 2) <= 57 && this.buf.charCodeAt(this.pos + 3) >= 48 && this.buf.charCodeAt(this.pos + 3) <= 57 && this.buf.charCodeAt(this.pos + 4) == 45) {
				var s3 = HxOverrides.substr(this.buf,this.pos,19);
				d = HxOverrides.strDate(s3);
				this.pos += 19;
			} else {
				var t = this.readFloat();
				var d1 = new Date();
				d1.setTime(t);
				d = d1;
			}
			this.cache.push(d);
			return d;
		case 115:
			var len1 = this.readDigits();
			var buf5 = this.buf;
			if(this.get(this.pos++) != 58 || this.length - this.pos < len1) throw new js__$Boot_HaxeError("Invalid bytes length");
			var codes = haxe_Unserializer.CODES;
			if(codes == null) {
				codes = haxe_Unserializer.initCodes();
				haxe_Unserializer.CODES = codes;
			}
			var i1 = this.pos;
			var rest = len1 & 3;
			var size;
			size = (len1 >> 2) * 3 + (rest >= 2?rest - 1:0);
			var max = i1 + (len1 - rest);
			var bytes = haxe_io_Bytes.alloc(size);
			var bpos = 0;
			while(i1 < max) {
				var c11 = codes[StringTools.fastCodeAt(buf5,i1++)];
				var c2 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c11 << 2 | c2 >> 4);
				var c3 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c2 << 4 | c3 >> 2);
				var c4 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c3 << 6 | c4);
			}
			if(rest >= 2) {
				var c12 = codes[StringTools.fastCodeAt(buf5,i1++)];
				var c21 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c12 << 2 | c21 >> 4);
				if(rest == 3) {
					var c31 = codes[StringTools.fastCodeAt(buf5,i1++)];
					bytes.set(bpos++,c21 << 4 | c31 >> 2);
				}
			}
			this.pos += len1;
			this.cache.push(bytes);
			return bytes;
		case 67:
			var name3 = this.unserialize();
			var cl1 = this.resolver.resolveClass(name3);
			if(cl1 == null) throw new js__$Boot_HaxeError("Class not found " + name3);
			var o2 = Type.createEmptyInstance(cl1);
			this.cache.push(o2);
			o2.hxUnserialize(this);
			if(this.get(this.pos++) != 103) throw new js__$Boot_HaxeError("Invalid custom data");
			return o2;
		case 65:
			var name4 = this.unserialize();
			var cl2 = this.resolver.resolveClass(name4);
			if(cl2 == null) throw new js__$Boot_HaxeError("Class not found " + name4);
			return cl2;
		case 66:
			var name5 = this.unserialize();
			var e2 = this.resolver.resolveEnum(name5);
			if(e2 == null) throw new js__$Boot_HaxeError("Enum not found " + name5);
			return e2;
		default:
		}
		this.pos--;
		throw new js__$Boot_HaxeError("Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos);
	}
	,__class__: haxe_Unserializer
};
var haxe_ds_IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe_ds_IntMap;
haxe_ds_IntMap.__name__ = true;
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	set: function(key,value) {
		this.h[key] = value;
	}
	,__class__: haxe_ds_IntMap
};
var haxe_ds_ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe_ds_ObjectMap;
haxe_ds_ObjectMap.__name__ = true;
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
haxe_ds_ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe_ds_ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,__class__: haxe_ds_ObjectMap
};
var haxe_ds__$StringMap_StringMapIterator = function(map,keys) {
	this.map = map;
	this.keys = keys;
	this.index = 0;
	this.count = keys.length;
};
$hxClasses["haxe.ds._StringMap.StringMapIterator"] = haxe_ds__$StringMap_StringMapIterator;
haxe_ds__$StringMap_StringMapIterator.__name__ = true;
haxe_ds__$StringMap_StringMapIterator.prototype = {
	hasNext: function() {
		return this.index < this.count;
	}
	,next: function() {
		return this.map.get(this.keys[this.index++]);
	}
	,__class__: haxe_ds__$StringMap_StringMapIterator
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe_ds_StringMap;
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,exists: function(key) {
		if(__map_reserved[key] != null) return this.existsReserved(key);
		return this.h.hasOwnProperty(key);
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,existsReserved: function(key) {
		if(this.rh == null) return false;
		return this.rh.hasOwnProperty("$" + key);
	}
	,remove: function(key) {
		if(__map_reserved[key] != null) {
			key = "$" + key;
			if(this.rh == null || !this.rh.hasOwnProperty(key)) return false;
			delete(this.rh[key]);
			return true;
		} else {
			if(!this.h.hasOwnProperty(key)) return false;
			delete(this.h[key]);
			return true;
		}
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
	,__class__: haxe_ds_StringMap
};
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
$hxClasses["haxe.io.Bytes"] = haxe_io_Bytes;
haxe_io_Bytes.__name__ = true;
haxe_io_Bytes.alloc = function(length) {
	return new haxe_io_Bytes(new ArrayBuffer(length));
};
haxe_io_Bytes.prototype = {
	set: function(pos,v) {
		this.b[pos] = v & 255;
	}
	,__class__: haxe_io_Bytes
};
var haxe_io_Error = $hxClasses["haxe.io.Error"] = { __ename__ : true, __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] };
haxe_io_Error.Blocked = ["Blocked",0];
haxe_io_Error.Blocked.toString = $estr;
haxe_io_Error.Blocked.__enum__ = haxe_io_Error;
haxe_io_Error.Overflow = ["Overflow",1];
haxe_io_Error.Overflow.toString = $estr;
haxe_io_Error.Overflow.__enum__ = haxe_io_Error;
haxe_io_Error.OutsideBounds = ["OutsideBounds",2];
haxe_io_Error.OutsideBounds.toString = $estr;
haxe_io_Error.OutsideBounds.__enum__ = haxe_io_Error;
haxe_io_Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe_io_Error; $x.toString = $estr; return $x; };
var haxe_io_FPHelper = function() { };
$hxClasses["haxe.io.FPHelper"] = haxe_io_FPHelper;
haxe_io_FPHelper.__name__ = true;
haxe_io_FPHelper.i32ToFloat = function(i) {
	var sign = 1 - (i >>> 31 << 1);
	var exp = i >>> 23 & 255;
	var sig = i & 8388607;
	if(sig == 0 && exp == 0) return 0.0;
	return sign * (1 + Math.pow(2,-23) * sig) * Math.pow(2,exp - 127);
};
haxe_io_FPHelper.floatToI32 = function(f) {
	if(f == 0) return 0;
	var af;
	if(f < 0) af = -f; else af = f;
	var exp = Math.floor(Math.log(af) / 0.6931471805599453);
	if(exp < -127) exp = -127; else if(exp > 128) exp = 128;
	var sig = Math.round((af / Math.pow(2,exp) - 1) * 8388608) & 8388607;
	return (f < 0?-2147483648:0) | exp + 127 << 23 | sig;
};
haxe_io_FPHelper.i64ToDouble = function(low,high) {
	var sign = 1 - (high >>> 31 << 1);
	var exp = (high >> 20 & 2047) - 1023;
	var sig = (high & 1048575) * 4294967296. + (low >>> 31) * 2147483648. + (low & 2147483647);
	if(sig == 0 && exp == -1023) return 0.0;
	return sign * (1.0 + Math.pow(2,-52) * sig) * Math.pow(2,exp);
};
haxe_io_FPHelper.doubleToI64 = function(v) {
	var i64 = haxe_io_FPHelper.i64tmp;
	if(v == 0) {
		i64.low = 0;
		i64.high = 0;
	} else {
		var av;
		if(v < 0) av = -v; else av = v;
		var exp = Math.floor(Math.log(av) / 0.6931471805599453);
		var sig;
		var v1 = (av / Math.pow(2,exp) - 1) * 4503599627370496.;
		sig = Math.round(v1);
		var sig_l = sig | 0;
		var sig_h = sig / 4294967296.0 | 0;
		i64.low = sig_l;
		i64.high = (v < 0?-2147483648:0) | exp + 1023 << 20 | sig_h;
	}
	return i64;
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
$hxClasses["js._Boot.HaxeError"] = js__$Boot_HaxeError;
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = true;
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var js_Browser = function() { };
$hxClasses["js.Browser"] = js_Browser;
js_Browser.__name__ = true;
js_Browser.getLocalStorage = function() {
	try {
		var s = window.localStorage;
		s.getItem("");
		return s;
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
js_Browser.createXMLHttpRequest = function() {
	if(typeof XMLHttpRequest != "undefined") return new XMLHttpRequest();
	if(typeof ActiveXObject != "undefined") return new ActiveXObject("Microsoft.XMLHTTP");
	throw new js__$Boot_HaxeError("Unable to create XMLHttpRequest object.");
};
js_Browser.alert = function(v) {
	window.alert(js_Boot.__string_rec(v,""));
};
var js_Cookie = function() { };
$hxClasses["js.Cookie"] = js_Cookie;
js_Cookie.__name__ = true;
js_Cookie.set = function(name,value,expireDelay,path,domain) {
	var s = name + "=" + encodeURIComponent(value);
	if(expireDelay != null) {
		var d = DateTools.delta(new Date(),expireDelay * 1000);
		s += ";expires=" + d.toGMTString();
	}
	if(path != null) s += ";path=" + path;
	if(domain != null) s += ";domain=" + domain;
	window.document.cookie = s;
};
js_Cookie.all = function() {
	var h = new haxe_ds_StringMap();
	var a = window.document.cookie.split(";");
	var _g = 0;
	while(_g < a.length) {
		var e = a[_g];
		++_g;
		e = StringTools.ltrim(e);
		var t = e.split("=");
		if(t.length < 2) continue;
		h.set(t[0],decodeURIComponent(t[1].split("+").join(" ")));
	}
	return h;
};
js_Cookie.get = function(name) {
	return js_Cookie.all().get(name);
};
js_Cookie.exists = function(name) {
	return js_Cookie.all().exists(name);
};
var js_Lib = function() { };
$hxClasses["js.Lib"] = js_Lib;
js_Lib.__name__ = true;
var js_html_compat_ArrayBuffer = function(a) {
	if((a instanceof Array) && a.__enum__ == null) {
		this.a = a;
		this.byteLength = a.length;
	} else {
		var len = a;
		this.a = [];
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			this.a[i] = 0;
		}
		this.byteLength = len;
	}
};
$hxClasses["js.html.compat.ArrayBuffer"] = js_html_compat_ArrayBuffer;
js_html_compat_ArrayBuffer.__name__ = true;
js_html_compat_ArrayBuffer.sliceImpl = function(begin,end) {
	var u = new Uint8Array(this,begin,end == null?null:end - begin);
	var result = new ArrayBuffer(u.byteLength);
	var resultArray = new Uint8Array(result);
	resultArray.set(u);
	return result;
};
js_html_compat_ArrayBuffer.prototype = {
	slice: function(begin,end) {
		return new js_html_compat_ArrayBuffer(this.a.slice(begin,end));
	}
	,__class__: js_html_compat_ArrayBuffer
};
var js_html_compat_DataView = function(buffer,byteOffset,byteLength) {
	this.buf = buffer;
	if(byteOffset == null) this.offset = 0; else this.offset = byteOffset;
	if(byteLength == null) this.length = buffer.byteLength - this.offset; else this.length = byteLength;
	if(this.offset < 0 || this.length < 0 || this.offset + this.length > buffer.byteLength) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
};
$hxClasses["js.html.compat.DataView"] = js_html_compat_DataView;
js_html_compat_DataView.__name__ = true;
js_html_compat_DataView.prototype = {
	getInt8: function(byteOffset) {
		var v = this.buf.a[this.offset + byteOffset];
		if(v >= 128) return v - 256; else return v;
	}
	,getUint8: function(byteOffset) {
		return this.buf.a[this.offset + byteOffset];
	}
	,getInt16: function(byteOffset,littleEndian) {
		var v = this.getUint16(byteOffset,littleEndian);
		if(v >= 32768) return v - 65536; else return v;
	}
	,getUint16: function(byteOffset,littleEndian) {
		if(littleEndian) return this.buf.a[this.offset + byteOffset] | this.buf.a[this.offset + byteOffset + 1] << 8; else return this.buf.a[this.offset + byteOffset] << 8 | this.buf.a[this.offset + byteOffset + 1];
	}
	,getInt32: function(byteOffset,littleEndian) {
		var p = this.offset + byteOffset;
		var a = this.buf.a[p++];
		var b = this.buf.a[p++];
		var c = this.buf.a[p++];
		var d = this.buf.a[p++];
		if(littleEndian) return a | b << 8 | c << 16 | d << 24; else return d | c << 8 | b << 16 | a << 24;
	}
	,getUint32: function(byteOffset,littleEndian) {
		var v = this.getInt32(byteOffset,littleEndian);
		if(v < 0) return v + 4294967296.; else return v;
	}
	,getFloat32: function(byteOffset,littleEndian) {
		return haxe_io_FPHelper.i32ToFloat(this.getInt32(byteOffset,littleEndian));
	}
	,getFloat64: function(byteOffset,littleEndian) {
		var a = this.getInt32(byteOffset,littleEndian);
		var b = this.getInt32(byteOffset + 4,littleEndian);
		return haxe_io_FPHelper.i64ToDouble(littleEndian?a:b,littleEndian?b:a);
	}
	,setInt8: function(byteOffset,value) {
		if(value < 0) this.buf.a[byteOffset + this.offset] = value + 128 & 255; else this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setUint8: function(byteOffset,value) {
		this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setInt16: function(byteOffset,value,littleEndian) {
		this.setUint16(byteOffset,value < 0?value + 65536:value,littleEndian);
	}
	,setUint16: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
		} else {
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p] = value & 255;
		}
	}
	,setInt32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,value,littleEndian);
	}
	,setUint32: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p++] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >>> 24;
		} else {
			this.buf.a[p++] = value >>> 24;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value & 255;
		}
	}
	,setFloat32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,haxe_io_FPHelper.floatToI32(value),littleEndian);
	}
	,setFloat64: function(byteOffset,value,littleEndian) {
		var i64 = haxe_io_FPHelper.doubleToI64(value);
		if(littleEndian) {
			this.setUint32(byteOffset,i64.low);
			this.setUint32(byteOffset,i64.high);
		} else {
			this.setUint32(byteOffset,i64.high);
			this.setUint32(byteOffset,i64.low);
		}
	}
	,__class__: js_html_compat_DataView
};
var js_html_compat_Uint8Array = function() { };
$hxClasses["js.html.compat.Uint8Array"] = js_html_compat_Uint8Array;
js_html_compat_Uint8Array.__name__ = true;
js_html_compat_Uint8Array._new = function(arg1,offset,length) {
	var arr;
	if(typeof(arg1) == "number") {
		arr = [];
		var _g = 0;
		while(_g < arg1) {
			var i = _g++;
			arr[i] = 0;
		}
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else if(js_Boot.__instanceof(arg1,js_html_compat_ArrayBuffer)) {
		var buffer = arg1;
		if(offset == null) offset = 0;
		if(length == null) length = buffer.byteLength - offset;
		if(offset == 0) arr = buffer.a; else arr = buffer.a.slice(offset,offset + length);
		arr.byteLength = arr.length;
		arr.byteOffset = offset;
		arr.buffer = buffer;
	} else if((arg1 instanceof Array) && arg1.__enum__ == null) {
		arr = arg1.slice();
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else throw new js__$Boot_HaxeError("TODO " + Std.string(arg1));
	arr.subarray = js_html_compat_Uint8Array._subarray;
	arr.set = js_html_compat_Uint8Array._set;
	return arr;
};
js_html_compat_Uint8Array._set = function(arg,offset) {
	var t = this;
	if(js_Boot.__instanceof(arg.buffer,js_html_compat_ArrayBuffer)) {
		var a = arg;
		if(arg.byteLength + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g1 = 0;
		var _g = arg.byteLength;
		while(_g1 < _g) {
			var i = _g1++;
			t[i + offset] = a[i];
		}
	} else if((arg instanceof Array) && arg.__enum__ == null) {
		var a1 = arg;
		if(a1.length + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g11 = 0;
		var _g2 = a1.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			t[i1 + offset] = a1[i1];
		}
	} else throw new js__$Boot_HaxeError("TODO");
};
js_html_compat_Uint8Array._subarray = function(start,end) {
	var t = this;
	var a = js_html_compat_Uint8Array._new(t.slice(start,end));
	a.byteOffset = start;
	return a;
};
var mt_js_Twinoid = $hx_exports.mt.js.Twinoid = function() { };
$hxClasses["mt.js.Twinoid"] = mt_js_Twinoid;
mt_js_Twinoid.__name__ = true;
mt_js_Twinoid.call = function(method,args,callb) {
	if(mt_js_Twinoid.boot != null) {
		var o = mt_js_Twinoid.boot;
		if(HxOverrides.substr(method,0,3) == "fb.") {
			method = HxOverrides.substr(method,3,null);
			o = mt_js_Twinoid.boot.fb;
			if(o == null) return;
		}
		var m = Reflect.field(o,method);
		if(m == null) throw new js__$Boot_HaxeError("No such method '" + method + "'");
		var r = m.apply(o,args);
		if(callb != null) callb(r);
		return;
	}
	var calls;
	try {
		calls = window._tid_calls;
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		calls = null;
	}
	if(calls == null) {
		var t = new haxe_Timer(100);
		t.run = function() {
			var tid = null;
			try {
				tid = _tid;
			} catch( e1 ) {
				if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
			}
			if(tid == null || !tid.isReady) return;
			mt_js_Twinoid.boot = tid;
			t.stop();
			var _g = 0;
			while(_g < calls.length) {
				var c = calls[_g];
				++_g;
				mt_js_Twinoid.call(c.m,c.a,c.c);
			}
			window._tid_calls = null;
		};
		calls = window._tid_calls = [];
	}
	calls.push({ m : method, a : args, c : callb});
};
mt_js_Twinoid.isConnected = function(proc) {
	mt_js_Twinoid.call("isConnected",[proc]);
};
mt_js_Twinoid.onLoad = function() {
	mt_js_Twinoid.call("onLoad",[]);
};
mt_js_Twinoid.quickNotice = function(msg,error) {
	mt_js_Twinoid.call("quickNotice",[msg,error]);
};
mt_js_Twinoid.notice = function(msg,error) {
	mt_js_Twinoid.call("notice",[msg,error]);
};
mt_js_Twinoid.lockBar = function() {
	mt_js_Twinoid.call("lockBar",[]);
};
mt_js_Twinoid.point = function(e,html) {
	mt_js_Twinoid.call("point",[e,html]);
};
mt_js_Twinoid.hidePointer = function() {
	mt_js_Twinoid.call("hidePointer",[]);
};
mt_js_Twinoid.onCssReady = function(cb) {
	mt_js_Twinoid.call("isCssReady",[],function(b) {
		if(b) cb(); else haxe_Timer.delay((function(f,cb1) {
			return function() {
				f(cb1);
				return;
			};
		})(mt_js_Twinoid.onCssReady,cb),100);
	});
};
mt_js_Twinoid.popImage = function(url,title) {
	mt_js_Twinoid.call("popImage",[url,title]);
};
mt_js_Twinoid.wallAutoShareUrl = function(url) {
	mt_js_Twinoid.call("wallAutoShareUrl",[url]);
};
mt_js_Twinoid.askCashFrame = function(params,onClose) {
	mt_js_Twinoid.call("askCashFrame",[params,onClose]);
};
mt_js_Twinoid.addLoadListener = function(callb) {
	mt_js_Twinoid.call("addLoadListener",[callb]);
};
mt_js_Twinoid.trackGlobalPageView = function(path) {
	try {
		mt_js_Twinoid.call("trackGlobalPageView",[path]);
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
	}
};
mt_js_Twinoid.trackSitePageView = function(path) {
	try {
		mt_js_Twinoid.call("trackSitePageView",[path]);
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
	}
};
mt_js_Twinoid.trackGlobalEvent = function(category,action,label) {
	try {
		mt_js_Twinoid.call("trackGlobalEvent",[category,action,label]);
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
	}
};
mt_js_Twinoid.trackSiteEvent = function(category,action,label) {
	try {
		mt_js_Twinoid.call("trackSiteEvent",[category,action,label]);
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
	}
};
var tid_App = function() {
	this.ua = new tid_UserAgent();
};
$hxClasses["tid.App"] = tid_App;
tid_App.__name__ = true;
tid_App.j = function(r) {
	return js.JQuery(r);
};
tid_App.main = function() {
	window._ = new tid_App();
};
tid_App.prototype = {
	addBodyClass: function() {
		var body = js.JQuery("body");
		if(js.JQuery.browser.mozilla) body.addClass("tid_ff");
		if(js.JQuery.browser.msie) body.addClass("tid_ie");
		if(js.JQuery.browser.opera) body.addClass("tid_opera");
		if(js.JQuery.browser.webkit) body.addClass("tid_webkit");
		body.addClass("tid_v" + Std.parseInt(js.JQuery.browser.version));
		if(body.attr("id") == "frame") {
			if(window.parent == null || window.parent == window) body.addClass("fullFrame").addClass("topWindow");
		}
	}
	,isTouch: function() {
		return Modernizr != null && Modernizr.touch;
	}
	,showEventBehind: function(eid,isForum) {
		var pm;
		pm = "ev:" + eid + (isForum?":forum":"");
		if(window.parent != null && window.parent != window) {
			window.parent.postMessage("bottomPopup","*");
			window.parent.postMessage(pm,"*");
		} else if(window.opener != null) window.opener.postMessage(pm,"*"); else if(this.tidModerate != null) this.tidModerate.postMessage(pm,"*"); else this.tidModerate = window.open("/ev/" + eid,"tidModerate");
	}
	,showGameSheet: function(id) {
		this.hideGameSheet();
		js.JQuery(".allGames .black").show();
		var e = js.JQuery(".sheet");
		e.html(this.loadingHTML());
		var h = new haxe_Http("/tid/gameSheet/" + id);
		h.onData = function(data) {
			e.html(data);
			e.find(".tab").hide().first().show();
			_tid.checkModules();
		};
		h.request(false);
		js.JQuery(".sheetWrapper").stop(true,true).fadeTo(100,1);
		return false;
	}
	,hideGameSheet: function() {
		js.JQuery(".sheetWrapper").stop().fadeTo(200,0).hide(1).find(".sheet").html("");
		js.JQuery(".allGames .black").hide();
		return false;
	}
	,scrollGameScreenshots: function(dx) {
		var wrapper = js.JQuery("#screenshotsWrapper");
		var scroller = wrapper.find(".scroller");
		var m = Std.parseInt(scroller.css("margin-left"));
		m -= dx * 400;
		if(m > 0) m = 0;
		if(m < -wrapper.parent().width()) m = -wrapper.parent().width();
		scroller.stop(true,true).animate({ marginLeft : m},400);
	}
	,popTab: function(name) {
		js.JQuery(".sheet ul li.selected").removeClass("selected");
		js.JQuery("li[name='" + name + "']").addClass("selected");
		js.JQuery(".sheet .tab").not("." + name).stop(true,true).fadeTo(200,0).hide(1);
		js.JQuery(".sheet .tab." + name).stop(true,true).fadeTo(500,1);
		return false;
	}
	,getCurrentFeaturing: function() {
		var c;
		if(js_Cookie.exists("curFeat")) c = Std.parseInt(js_Cookie.get("curFeat")); else c = 0;
		if(isNaN(c) || c == null) c = 0;
		return c;
	}
	,featuring: function(delta,delay) {
		if(delay == null) delay = 200;
		this.setAutoScroll();
		var f = js.JQuery("#feat");
		var arts = f.find(".art");
		var idx;
		if(delta == 0) idx = this.getCurrentFeaturing(); else idx = f.find(".art:visible").index();
		idx += delta;
		if(idx < 0) idx = arts.length - 1;
		if(idx >= arts.length) idx = 0;
		js_Cookie.set("curFeat",idx == null?"null":"" + idx,null,"/");
		var i = 0;
		var $it0 = (arts.iterator)();
		while( $it0.hasNext() ) {
			var e = $it0.next();
			e.stop(false,false);
			if(i == idx) e.fadeTo(delay,1); else if(e["is"](":visible")) e.fadeTo(delay,0).hide(1);
			i++;
		}
	}
	,initFeaturing: function() {
		var i = 0;
		this.featuring(0,0);
		this.setAutoScroll();
	}
	,setAutoScroll: function() {
		if(this.featTimer != null) {
			this.featTimer.stop();
			this.featTimer = null;
		}
		if(js.JQuery("#feat .artList .art").length <= 1) return;
		this.featTimer = new haxe_Timer(5000);
		this.featTimer.run = (function(f,a1,a2) {
			return function() {
				f(a1,a2);
				return;
			};
		})($bind(this,this.featuring),1,200);
	}
	,onCreatePasswordChange: function() {
		js.JQuery("#create .reveal .off").removeClass("off");
	}
	,revealCreatePassword: function(bt,parent) {
		var input = parent.find("input.field");
		var clone = input.clone(true);
		if(input.attr("type") == "password") {
			clone.attr("type","text");
			input.replaceWith(clone);
			clone.focus().val(input.val());
			parent.find(".inputWrapper").addClass("revealed").show();
		} else if(input.attr("type") == "text") {
			clone.attr("type","password");
			input.replaceWith(clone);
			clone.focus().val(input.val());
			parent.find(".inputWrapper").removeClass("revealed");
		}
	}
	,initAccountBlocks: function(openName) {
		var _g = this;
		var menu = js.JQuery("#content .blockMenu");
		var pushHistory = function(n) {
			window.history.pushState({ blockName : n},null,"/user/account/" + n);
		};
		var select = js.JQuery("<select></select>");
		select.change(function(_) {
			var name = select.val();
			pushHistory(name);
			_g.openAccountBlock(name);
			select.blur();
		});
		menu.prepend(select);
		var blocks = js.JQuery("#content .block");
		var $it0 = (blocks.iterator)();
		while( $it0.hasNext() ) {
			var b = $it0.next();
			if(b.hasClass("separator")) {
				menu.append("<div class='sep'></div>");
				continue;
			}
			var name1 = [b.attr("name")];
			if(openName == null) {
				openName = name1[0];
				pushHistory(name1[0]);
			}
			var label = b.attr("title");
			var link = js.JQuery("<a href='#'>" + label + "</a>");
			link.attr("name",name1[0]);
			link.click((function(name1) {
				return function() {
					pushHistory(name1[0]);
					_g.openAccountBlock(name1[0]);
					select.val(name1[0]);
					return false;
				};
			})(name1));
			select.append("<option value='" + name1[0] + "'>" + label + "</option>");
			b.removeAttr("title");
			menu.append(link);
		}
		this.openAccountBlock(openName);
	}
	,openAccountBlock: function(name) {
		var parent = js.JQuery("#content");
		var menu = parent.find(".blockMenu");
		menu.find("a").removeClass("active").filter("[name=" + name + "]").addClass("active");
		parent.find(".block").hide().filter("[name=" + name + "]").show();
	}
	,showPopUpPanel: function(id) {
		js.JQuery(".spanel").not(id).stop(true,true).hide();
		js.JQuery(id).fadeIn(350);
	}
	,initScreenLoop: function(all) {
		if(all.length == 0) return;
		all.hide().first().show();
		var t = new haxe_Timer(2500);
		var idx = 0;
		t.run = function() {
			if(all["is"](":visible")) {
				all.filter(":visible").fadeTo(400,0).hide(1);
				idx++;
				if(idx >= all.length) idx = 0;
				all.eq(idx).fadeTo(400,1);
			} else t.stop();
		};
	}
	,filterGames: function(url,t) {
		var _g = this;
		tid_App.j(window).unbind("popstate.filterGames").bind("popstate.filterGames",function(e) {
			var e1 = e.originalEvent;
			if(e1 == null) return;
			_g.filterGames(null,e1.state == null?null:e1.state.tag);
		});
		if(url != null) {
			if(window.location.pathname != url) window.history.pushState({ tag : t},null,url); else window.history.replaceState({ tag : t},null,window.location.href);
		}
		var shelf = js.JQuery("#content .shelf");
		if(t != null) shelf.addClass("filtered"); else shelf.removeClass("filtered");
		var tabs = js.JQuery("#subBar .tabs li");
		tabs.removeClass("selected");
		tabs.filter("#tag_" + t).addClass("selected");
		if(t != null) js.JQuery("#reco").hide(); else js.JQuery("#reco").show();
		var games = shelf.find(".shelfg");
		if(t == null) games.show(); else {
			games.not(".tag_" + t).hide();
			games.filter(".tag_" + t).show();
			shelf.stop(true,true).hide().fadeIn(300);
		}
		if(t == null) js.JQuery("#tagDesc").slideUp(200); else {
			js.JQuery("#tagDesc").show();
			var $it0 = (function($this) {
				var $r;
				var _this = js.JQuery("#tagDesc .desc");
				$r = (_this.iterator)();
				return $r;
			}(this));
			while( $it0.hasNext() ) {
				var e2 = $it0.next();
				if(e2.attr("id") == "td_" + t) e2.show(); else e2.hide();
			}
		}
		return false;
	}
	,go: function(url) {
		if(url.indexOf("?") >= 0) url += ";"; else url += "?";
		url += "sid=" + StringTools.urlEncode(js.JQuery("#sessionSid").val());
		var q = js.JQuery("#tidHost");
		if(q.length == 1) url += ";host=" + StringTools.urlEncode(q.val());
		window.location.assign(url);
	}
	,http: function(url) {
		var _g = this;
		var h = new haxe_Http(url);
		var q = js.JQuery("#sessionSid");
		if(q.length == 1) h.setParameter("sid",q.val());
		var q1 = js.JQuery("#tidHost");
		if(q1.length == 1) h.setParameter("host",q1.val());
		var r = { onData : null, setParameter : function(k,v) {
			return h.setParameter(k,v);
		}, request : function() {
			h.request(true);
			return;
		}};
		h.onData = function(d) {
			r.onData(d);
			_g.onLoad();
		};
		return r;
	}
	,onLoad: function() {
		if(window._tid != null) window._tid.onLoad();
	}
	,quietGet: function(url,params) {
		var h = this.http(url);
		if(params != null) {
			var _g = 0;
			var _g1 = Reflect.fields(params);
			while(_g < _g1.length) {
				var k = _g1[_g];
				++_g;
				var v = Reflect.field(params,k);
				if(v == null) continue;
				h.setParameter(k,Std.string(v));
			}
		}
		h.onData = function(_) {
		};
		h.request();
	}
	,load: function(q,url,params,onData) {
		var h = this.http(url);
		var _g = 0;
		var _g1 = Reflect.fields(params);
		while(_g < _g1.length) {
			var k = _g1[_g];
			++_g;
			var v = Reflect.field(params,k);
			if(v == null) continue;
			h.setParameter(k,Std.string(v));
		}
		if(onData != null) h.onData = onData; else h.onData = function(h1) {
			q.html(h1);
		};
		h.request();
	}
	,loadJS: function(url,params) {
		var h = new haxe_Http(url);
		if(params != null) {
			var _g = 0;
			var _g1 = Reflect.fields(params);
			while(_g < _g1.length) {
				var k = _g1[_g];
				++_g;
				var v = Reflect.field(params,k);
				if(v == null) continue;
				h.setParameter(k,Std.string(v));
			}
		}
		h.onData = function(d) {
			eval(d);
		};
		h.request(false);
	}
	,loadAppend: function(q,url,params) {
		this.load(q,url,params,function(h) {
			q.append(h);
		});
		return;
	}
	,contact: function(act,id) {
		var h = this.http("/contact/" + act + "/" + id);
		h.onData = function(d) {
			if(act == "add") {
				js.JQuery(d).fadeTo(0,0).prependTo("table.contact_list").fadeTo(500,1);
				js.JQuery("form input[type=text]").val("");
			} else if(act == "rem") js.JQuery("table.contact_list #contact_" + id).hide(500,function() {
				js.JQuery(this).remove();
			});
			js.JQuery("#search").focus();
		};
		h.request();
	}
	,checkBar: function(cb) {
		if(window._tid == null) {
			haxe_Timer.delay(cb,400);
			return false;
		} else return true;
	}
	,point: function(e,html) {
		if(this.checkBar((function(f,e1,a1) {
			return function() {
				f(e1,a1);
				return;
			};
		})($bind(this,this.point),e,html))) window._tid.point(e,html);
	}
	,notice: function(str,error) {
		if(this.checkBar((function(f,a1,a2) {
			return function() {
				f(a1,a2);
				return;
			};
		})($bind(this,this.notice),str,error))) window._tid.notice(str,error);
	}
	,quickNotice: function(str,error) {
		if(this.checkBar((function(f,a1,a2) {
			return function() {
				f(a1,a2);
				return;
			};
		})($bind(this,this.quickNotice),str,error))) window._tid.quickNotice(str,error);
	}
	,setExcludeNotifSource: function(id,flag,chk) {
		var h = new haxe_Http("/user/excludeNotifSource/" + id + "/" + flag + "?chk=" + chk);
		h.request(true);
	}
	,setSiteStorySubscription: function(id,flag,chk) {
		var h = new haxe_Http("/story/set/" + id + "/" + flag + "?chk=" + chk);
		h.request(true);
	}
	,initDiscuss: function(baseUrl,full) {
		window._discuss = new tid_Discuss(this,full,baseUrl);
	}
	,acceptForwardPost: function(domain,proto) {
		var _g = this;
		if(proto == null) proto = "http:";
		var onMessage = function(e) {
			if(e.origin != proto + "//" + domain) return;
			_g.forwardPost(e.data,true);
		};
		var w = window;
		if($bind(w,w.addEventListener) != null) w.addEventListener("message",onMessage,false); else if(w.attachEvent != null) w.attachEvent("onmessage",onMessage);
	}
	,forwardPost: function(data,forward) {
		if(forward == null) forward = false;
		var d = haxe_Unserializer.run(data);
		var h = this.http(d.url);
		var _g = 0;
		var _g1 = d.params;
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			h.setParameter(p.name,p.value);
		}
		if(!forward) {
			h.setParameter("sid",window._tid.session.sid);
			h.setParameter("host",window.location.hostname);
		}
		h.onData = function(s) {
			if(forward) {
				window.parent.postMessage("exec:" + s,"*");
				window.parent.postMessage("onLoad","*");
				window.parent.postMessage("unlockForm:" + d.id,"*");
			} else {
				eval(s);
				window._tid.unlockForm(js.JQuery("#" + d.id));
			}
		};
		h.request();
	}
	,loadingHTML: function() {
		var txt;
		var _g = "fr";
		switch(_g) {
		case "fr":
			txt = "Chargement...";
			break;
		case "es":
			txt = "Cargando...";
			break;
		default:
			txt = "Loading...";
		}
		var host = window.location.hostname;
		return "<div class=\"tid_loading\"><img src=\"//" + host + "/img/loading.gif\"/> " + txt + "</div>";
	}
	,isFlashEnabled: function() {
		return deconcept.SWFObjectUtil.getPlayerVersion().versionIsValid(new deconcept.PlayerVersion([9]));
	}
	,newSWFObject: function(swf,id,w,h,ver,color) {
		return new js.SWFObject(swf,id,w,h,ver,color);
	}
	,introPanel: function(dir,id,anim) {
		if(anim == null) anim = true;
		var d;
		if(anim) d = 500; else d = 0;
		var cur = js.JQuery(".intro .panel.active");
		if(cur.length == 0) return;
		var next;
		if(id != null) next = js.JQuery(".intro .panel:eq(" + id + ")"); else if(dir > 0) next = cur.next(".intro .panel"); else next = cur.prev(".intro .panel");
		if(next.length == 0 && dir > 0) next = js.JQuery(".intro .panel").first();
		if(next.length == 0 && dir < 0) next = js.JQuery(".intro .panel").last();
		if(next.length == 0) {
			js_Browser.alert("next not found");
			return;
		}
		cur.removeClass("active").stop(true,true).fadeOut(d,function() {
			next.addClass("active").fadeIn(d);
			var idx = next.index(".intro .panel");
			var html = "";
			var _g1 = 0;
			var _g = js.JQuery(".intro .panel").length;
			while(_g1 < _g) {
				var i = _g1++;
				html += "<a class=\"dot" + (i == idx?" active":"") + "\" href=\"/tid/intro?id=" + i + "\" onclick=\"_.introPanel(0, " + i + "); return false;\"></a>";
			}
			js.JQuery(".dots").html(html);
		});
	}
	,storeKeepSession: function(set) {
		var s = js_Browser.getLocalStorage();
		if(s == null) return null;
		if(set == null) return s.getItem("keepSession") == "1"; else if(set) s.setItem("keepSession","1"); else s.removeItem("keepSession");
		return null;
	}
	,delay: function(f,t) {
		return haxe_Timer.delay(f,t);
	}
	,initHiddenVars: function() {
		var _g = this;
		var h = js.JQuery("#hiddenVars");
		js.JQuery("form").submit(function(e) {
			js.JQuery(this).append(h.contents().clone());
		});
		js.JQuery("a.addHidden").click(function(e1) {
			e1.stopPropagation();
			e1.preventDefault();
			var a = js.JQuery(this);
			var mkForm = function() {
				var f = tid_App.j("<form method=\"post\" action=\"" + a.attr("href") + "\"></form>");
				if(a.attr("target") != null) f.attr("target",a.attr("target"));
				f.append(h.contents().clone());
				if(a.hasClass("oauthBtn") && js.JQuery("input[name=keepSession]")["is"](":checked")) f.append("<input type=\"hidden\" name=\"keepSession\" value=\"1\"/>");
				if(a["is"](".nativeAuth")) {
					if(a.hasClass("disabled")) return;
					a.addClass("disabled");
					var h1 = new haxe_Http(a.attr("href"));
					var _g1 = 0;
					var _g11 = f.serializeArray();
					while(_g1 < _g11.length) {
						var e2 = _g11[_g1];
						++_g1;
						h1.setParameter(e2.name,e2.value);
					}
					h1.setParameter("useNativeAuth","1");
					h1.onData = function(d) {
						try {
							eval(d);
						} catch( e3 ) {
							if (e3 instanceof js__$Boot_HaxeError) e3 = e3.val;
						}
						a.removeClass("disabled");
					};
					h1.onError = function(_) {
						a.removeClass("disabled");
					};
					h1.request(true);
				} else f.appendTo("body").submit();
			};
			if(a.hasClass("checkOAuthWarning")) {
				var input = js.JQuery("input[name=login]");
				var view;
				try {
					view = js_Browser.getLocalStorage().getItem("oaWarnViewed") != null;
				} catch( e4 ) {
					if (e4 instanceof js__$Boot_HaxeError) e4 = e4.val;
					view = false;
				}
				if(input.val() != "" && !view) {
					var panel = js.JQuery(".spanel.oauthWarning");
					panel.find("span.oauthName").html(a.text());
					panel.find("a.continueOAuth").click(function(e5) {
						try {
							js_Browser.getLocalStorage().setItem("oaWarnViewed","1");
						} catch( e6 ) {
							if (e6 instanceof js__$Boot_HaxeError) e6 = e6.val;
						}
						e5.preventDefault();
						e5.stopPropagation();
						mkForm();
					});
					_g.showPopUpPanel(".spanel.oauthWarning");
					return;
				}
			}
			mkForm();
		});
	}
	,restoreLastLogin: function() {
		try {
			var stored = js_Browser.getLocalStorage().getItem("tidLastLogin");
			if(stored == null) return;
			var input = js.JQuery("input[name=login]");
			var val = input.val();
			if(val == "" && val != stored) {
				input.val(stored);
				js.JQuery("input[name=pass]").focus();
			}
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
		}
	}
	,openMenu: function() {
		var main = js.JQuery("#mainMenu .scontainer");
		var f = main.find("ul.floatingMenu");
		if(f.length > 0) {
			main.find("li.openMenu").removeClass("open");
			f.remove();
			js.JQuery("#menu_noclick").remove();
		} else {
			main.find("li.openMenu").addClass("open");
			var baseMenu = main.find("ul.menu");
			var menu = baseMenu.clone();
			menu.appendTo(main).removeClass("menu").addClass("floatingMenu");
			js.JQuery("<div id=\"menu_noclick\" class=\"tid_noclick\"></div>").appendTo("body").click($bind(this,this.openMenu));
		}
	}
	,activeNarrowTab: function(a) {
		var cn = a.attr("tid_tab");
		js.JQuery("ul.narrowTabs li").removeClass("selected");
		a.parent().addClass("selected");
		js.JQuery("div.narrowTab.active").removeClass("active");
		js.JQuery("div.narrowTab." + cn).addClass("active");
	}
	,initFrame: function(host,proto) {
		if(proto == null) proto = "http:";
		if(window.parent == null || window.parent == window) return;
		var onMessage = function(e) {
			if(e.origin != proto + "//" + host) return;
			eval(e.data);
		};
		var w = window;
		if($bind(w,w.addEventListener) != null) w.addEventListener("message",onMessage,false); else if(w.attachEvent != null) w.attachEvent("onmessage",onMessage);
		window.parent.postMessage("popupReady",proto + "//" + host);
	}
	,initBarCustomizer: function(chk) {
		js.JQuery("#gameSelection").sortable({ connectWith : ".sortable.games", placeholder : "placeHolder", update : function(event,ui) {
			var added = js.JQuery("#gameSelection").sortable("toArray",{ attribute : "sort_id"});
			var ignored = js.JQuery("#gameStock").sortable("toArray",{ attribute : "sort_id"});
			var h = new haxe_Http("/user/updateGameList?chk=" + chk + ";added=" + added.join(",") + ";ignored=" + ignored.join(","));
			h.request(true);
		}});
		js.JQuery("#gameStock").sortable({ connectWith : ".sortable.games", placeholder : "placeHolder"});
		var all = js.JQuery("#gameSelection, #gameStock");
		all.find(".buggyPlaceHolder").remove();
		all.disableSelection();
	}
	,initFieldHelp: function() {
		var _g = this;
		js.JQuery("input[tid_help]").focus(function(_) {
			if(js.JQuery(this).hasClass("helpOpen")) return;
			var e = tid_App.j("<span id=\"fieldHelp\">" + js.JQuery(this).attr("tid_help") + "</span><span id=\"fieldHelpArrow\"></span>");
			js.JQuery(this).addClass("helpOpen").before(e);
			if(_g.isTouch()) e.show(); else e.css("opacity","0").animate({ opacity : 1},500);
		});
		js.JQuery("input[tid_help]").blur(function(_1) {
			js.JQuery(this).removeClass("helpOpen");
			js.JQuery("#fieldHelp").remove();
			js.JQuery("#fieldHelpArrow").remove();
		});
	}
	,showTip: function(e,txt) {
		this.createBubbleTip(e,"tid_simpleTip",txt,true);
	}
	,hideTip: function() {
		js.JQuery("#tid_simpleTip").remove();
	}
	,createBubbleTip: function(e,id,html,hideOnOver) {
		js.JQuery("#" + id).remove();
		if(e == null || e.length == 0) return;
		html = StringTools.replace(html,"\\n","<br/>");
		var ptr = js.JQuery("<div id=\"" + id + "\"><img class=\"tid_arrow\" alt=\"\"/><div class=\"tid_inner\">" + html + "</div></div>");
		js.JQuery("body").prepend(ptr);
		var of = e.offset();
		var w = e.outerWidth();
		var ptrWidth = ptr.width();
		if(hideOnOver) ptr.mouseover(function(_) {
			js.JQuery("#" + id).remove();
		});
		var y = of.top - ptr.height() - 7;
		var left = w * 0.5 + of.left - ptrWidth * 0.5;
		var bw = Math.max(js.JQuery("body").width(),of.left + w);
		ptr.find(".tid_arrow").attr("src","/img/design/simpleTipArrow.png").css({ marginLeft : ptrWidth * 0.5 - 5, marginTop : ptr.height() - 1});
		ptr.css("opacity","0.1").css({ top : y - 5, left : left}).animate({ opacity : 1, top : y},200,"linear");
	}
	,initGroupStyle: function() {
		window._gStyle = new tid_GroupStyle();
	}
	,nme: function(script) {
		var win = window;
		var l = win.NMEQ;
		win.NMEQ = function() {
			if(l != null) l();
			win.NME.call(script);
			win.NMEQ = null;
		};
		if(win.NME != null) win.NMEQ();
	}
	,initPressKitEditor: function(params) {
		new tid_PressKitEditor(params);
	}
	,loginOnFocusEmail: function(input) {
		var wh = tid_App.j(window).height();
		if(wh > 400) return;
		var frame = input.parents().filter("#frameContent.deviceLogin");
		if(frame.length == 0) return;
		var row = input.closest(".row");
		var ofp = input.offsetParent();
		var y = row.position().top - ofp.position().top + ofp.scrollTop();
		frame.parent().scrollTop(y);
	}
	,checkEmailSyntax: function(email) {
		return email != null && new EReg("^[^()<>@,;:\\\\\"\\[\\]\\s]+@[A-Z0-9][A-Z0-9-]*(\\.[A-Z0-9][A-Z0-9-]*)*\\.(xn--[A-Z0-9]+|[A-Z]{2,8})$","i").match(email);
	}
	,__class__: tid_App
};
var tid_Discuss = function(app,full,baseUrl) {
	var _g = this;
	this.app = app;
	this.full = full;
	this.baseUrl = baseUrl;
	this.resizeWindow();
	js.JQuery(window).resize(function(_) {
		_g.resizeWindow();
	});
	this.activePanel("threadsPanel");
	mt_js_Twinoid.call("addEventNotifListener",[$bind(this,this.onEventNotif)]);
};
$hxClasses["tid.Discuss"] = tid_Discuss;
tid_Discuss.__name__ = true;
tid_Discuss.j = function(r) {
	return js.JQuery(r);
};
tid_Discuss.boot = function() {
	return window._tid;
};
tid_Discuss.prototype = {
	setCurThread: function(id) {
		var _g = this;
		if(this.curThread == id) return;
		var onMessage = function(data) {
			var me = window._tid.session.tid;
			if(data.uid == me || _g.curThread != id) return;
			var q = _g.updateThread(data.html);
			if(q.filter(".discussMsg").length > 0) {
				js.JQuery("#discussLastIdx").remove();
				js.JQuery("#discussMinIdx").remove();
				var q2 = q.wrap("<body>").parent();
				if(q2.find(".discussMsg").length > 0) {
					js.JQuery("#discussThread .buttonHide").removeClass("off");
					js.JQuery("#discussThread .buttonDelete").removeClass("off");
				}
				if(q2.find(".discussMsg.me.new").length > 0) js.JQuery("#discussMsgs .discussMsg.new").removeClass("new").find(".tid_newIcon").remove(); else if(q2.find(".discussMsg.other.new").length > 0) js.JQuery("#discussMsgs .discussMsg.me.new").removeClass("new").find(".tid_newIcon").remove();
				q.unwrap();
				q.hide().prependTo("#discussMsgs").filter("div").slideDown(null,$bind(_g,_g.updateShadows));
				_g.app.onLoad();
			}
		};
		if(this.curThread != null) mt_js_Twinoid.call("leaveChannel",["ev/" + this.curThread]);
		this.curThread = id;
		mt_js_Twinoid.call("joinChannel",["ev/" + this.curThread,onMessage]);
	}
	,onEventNotif: function(eid) {
		var e = js.JQuery("#discussThread_" + eid).addClass("new");
		if(window._tid != null) e.find("td.main img.cursor").after(window._tid.newIconHTML());
	}
	,autoScroll: function(scroller,onBottom,onScroll) {
		scroller.scrollTop(0);
		if(onScroll != null) onScroll();
		if(scroller.toArray()[0].scrollHeight <= scroller.innerHeight()) onBottom();
		var os = function(_) {
			if(onScroll != null) onScroll();
			if(scroller.toArray()[0].scrollHeight == scroller.scrollTop() + scroller.innerHeight()) onBottom();
		};
		scroller.scroll(os);
		js.JQuery("#frameContent").unbind("scroll.dAutoScroll").bind("scroll.dAutoScroll",os);
	}
	,reloadThreads: function(section,author,search) {
		var _g = this;
		var e = js.JQuery("#discussThreads");
		e.find(".lcontainer").html("");
		e.find(".loading").show();
		e.find(".menu .tab.active").removeClass("active");
		e.find("#discussSearch").hide();
		switch(section) {
		case "archive":
			e.find(".menu .tab.tabArchive").addClass("active");
			break;
		case "inbox":
			e.find(".menu .tab.tabRecent").addClass("active");
			break;
		case "search":
			e.find(".menu .tab.tabSearch").addClass("active");
			e.find("#discussSearch").show().find("input[type=text]").first().val(search == null?"":search).focus();
			break;
		default:
			throw new js__$Boot_HaxeError("??");
		}
		e.find(".lcontainer").attr("tid_section",section);
		var h = this.app.http(this.baseUrl + "threads");
		h.setParameter("full",Std.string(this.full));
		h.setParameter("section",section);
		if(section == "search") {
			if(search != null && search != "") h.setParameter("search",search);
			if(author != null && author != "") h.setParameter("author",author);
		}
		h.onData = function(d) {
			e.find(".lcontainer").html(d);
			e.find(".loading").hide();
			_g.onThreadsLoad();
		};
		h.request();
		this.reset();
	}
	,searchThreads: function(form) {
		this.reloadThreads("search",form.find("input[name=author]").val(),form.find("input[name=search]").val());
	}
	,onThreadsLoad: function() {
		this.autoScroll(js.JQuery("#discussThreads .threadsWrapper"),$bind(this,this.loadThreadsAfter));
		haxe_Timer.delay($bind(this,this.updateFriends),1);
	}
	,loadThreadsAfter: function() {
		var _g = this;
		var e = js.JQuery("#discussThreads");
		var btn = e.find(".buttonAutoScroll");
		if(btn.length == 0) return;
		var start = btn.attr("tid_start");
		btn.remove();
		e.find(".lcontainer .loading").show();
		var h = this.app.http(this.baseUrl + "threads");
		h.setParameter("full",Std.string(this.full));
		h.setParameter("archive",e.find(".lcontainer").attr("tid_section"));
		h.setParameter("start",start);
		h.onData = function(d) {
			var q = js.JQuery(d);
			e.find(".lcontainer .loading").remove();
			if(q.filter(".placeHolder").length > 0) return;
			e.find(".lcontainer").append(q);
			haxe_Timer.delay($bind(_g,_g.updateFriends),1);
		};
		h.request();
	}
	,updateFriends: function() {
		if(window._tid == null) {
			haxe_Timer.delay($bind(this,this.updateFriends),200);
			return;
		}
		var $it0 = (function($this) {
			var $r;
			var _this = js.JQuery("#discussThreads .discussThread").not(".parsed");
			$r = (_this.iterator)();
			return $r;
		}(this));
		while( $it0.hasNext() ) {
			var e = $it0.next();
			var id = e.attr("tid_uid");
			e.addClass("parsed");
			if(id == null || id == "") e.addClass("group"); else if(window._tid.contact.has(Std.parseInt(id))) e.addClass("friend"); else e.addClass("unknown");
		}
	}
	,updateThread: function(s) {
		this.activePanel("discussThread");
		var q = js.JQuery(s);
		if(q.not("script").length == 0) {
			js.JQuery("body").append(q.filter("script"));
			q = q.not("script");
		}
		this.parseMessages(q);
		var $it0 = (function($this) {
			var $r;
			var _this = q.find(".discussThread");
			$r = (_this.iterator)();
			return $r;
		}(this));
		while( $it0.hasNext() ) {
			var e = $it0.next();
			js.JQuery("#discussThreads .lcontainer .selected").removeClass("selected");
			var p = e.parent();
			if(!e.hasClass("discussThreadHide") || js.JQuery("#discussThreads .menu .tab.tabArchive").hasClass("active")) {
				e.addClass("selected");
				var ex = tid_Discuss.j("#discussThreads .lcontainer #" + e.attr("id"));
				if(ex.length >= 1) ex.replaceWith(e); else e.prependTo("#discussThreads .lcontainer");
				haxe_Timer.delay($bind(this,this.updateFriends),1);
			}
			p.html("");
		}
		return q;
	}
	,hideThread: function(ids) {
		this.modifThread(ids,this.baseUrl + "hide");
	}
	,deleteThread: function(ids) {
		this.modifThread(ids,this.baseUrl + "delete");
	}
	,markUnread: function(id,newCount) {
		var _g = this;
		if(newCount == null || newCount == 0) newCount = 1;
		var h = this.app.http(this.baseUrl + "markUnread");
		h.setParameter("thread",id == null?"null":"" + id);
		h.setParameter("newCount",newCount == null?"null":"" + newCount);
		h.onData = function(d) {
			_g.updateThread("<table>" + d + "</table>");
		};
		h.request();
	}
	,modifThread: function(ids,url) {
		var h = this.app.http(url);
		h.setParameter("ids",ids);
		h.onData = function(d) {
			var archive = js.JQuery("#discussThreads .menu .tab.tabArchive").hasClass("active");
			var $it0 = (function($this) {
				var $r;
				var _this = js.JQuery(d);
				$r = (_this.iterator)();
				return $r;
			}(this));
			while( $it0.hasNext() ) {
				var e = $it0.next();
				var e1 = [e];
				if(e1[0].hasClass("delete") || e1[0].hasClass("hidden") && !archive) tid_Discuss.j("#" + e1[0].attr("id")).slideUp(null,(function(e1) {
					return function() {
						e1[0].remove();
					};
				})(e1));
				if(e1[0].hasClass("hidden")) tid_Discuss.j("#discussPanelThread_" + e1[0].attr("tid_id") + " .buttonHide").addClass("off");
			}
		};
		h.request();
		this.reset();
	}
	,newThread: function($with,initCall) {
		var _g = this;
		var e = js.JQuery("#discussThread");
		e.find(".lcontainer").attr("id","").html("");
		e.find(".loading").show();
		var h = this.app.http(this.baseUrl + "newThread");
		h.setParameter("with",$with);
		h.onData = function(d) {
			e.addClass("");
			e.find(".loading").hide();
			e.find(".lcontainer").html(d);
			if(!initCall || $with != "") _g.activePanel("discussThread");
			_g.resizeWindow();
			_g.restoreMsg();
		};
		h.request();
	}
	,addPeer: function(id,name) {
		var skel = js.JQuery("#addPeerSkel").html();
		var peers = js.JQuery("#threadPeers");
		var l = peers.find("li.peer");
		if(l.length >= 50) return;
		js.JQuery("#discussAddPeerForm input[type=text]").val("");
		var $it0 = (l.iterator)();
		while( $it0.hasNext() ) {
			var p1 = $it0.next();
			if(p1.attr("tid_id") == (id == null?"null":"" + id)) return;
		}
		var p = tid_Discuss.j(skel.split("%name%").join(name).split("%id%").join(id == null?"null":"" + id));
		p.find(".tid_user").removeClass("tid_parsed");
		js.JQuery("#contact_" + id).hide();
		peers.append(p);
		this.app.onLoad();
	}
	,removePeer: function(e) {
		tid_Discuss.j("#contact_" + e.attr("tid_id")).show();
		e.remove();
	}
	,showThread: function(id) {
		var _g = this;
		var e = js.JQuery("#discussThread");
		e.find(".lcontainer").attr("id","").html("");
		e.find(".loading").show();
		var h = this.app.http(this.baseUrl + "thread/" + id);
		h.setParameter("full",Std.string(this.full));
		h.onData = function(d) {
			try {
				_g.setCurThread(id);
			} catch( e1 ) {
				if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
			}
			e.addClass("");
			var q = _g.updateThread(d);
			if(q.filter("title").length > 0) return;
			e.find(".loading").hide();
			e.find(".lcontainer").attr("id","discussPanelThread_" + id).html(q);
			_g.resizeWindow();
			_g.autoScroll(js.JQuery("#scroll"),$bind(_g,_g.loadAfter),$bind(_g,_g.updateShadows));
			_g.restoreMsg();
		};
		h.request();
	}
	,restoreMsg: function() {
		var r = js.JQuery("textarea#discussFullRestoreMsg");
		if(r.length == 1 && r.val().length > 0) {
			js.JQuery("#discussInput").val(r.val());
			js.JQuery("#buttonReply").click();
			r.remove();
		}
	}
	,updateShadows: function() {
		var scroller = js.JQuery("#scroll");
		if(scroller.length == 0) return;
		var topShadow = js.JQuery("#topShadow");
		var bottomShadow = js.JQuery("#bottomShadow");
		topShadow.css("width",scroller.width() + "px");
		bottomShadow.css("width",scroller.width() + "px");
		if(scroller.toArray()[0].scrollHeight <= scroller.scrollTop() + scroller.height()) bottomShadow.hide(); else bottomShadow.show();
		var s = scroller.scrollTop();
		if(s == 0) topShadow.hide(); else topShadow.show();
	}
	,resizeWindow: function() {
		var e = js.JQuery("#discussInput");
		e.width(250);
		e.width(e.closest("table").width() - 50);
		var h = tid_Discuss.j(window).height() - 190;
		js.JQuery(".threadsWrapper").height(h - 20);
		js.JQuery("#scroll").height(h);
		js.JQuery("#sendContacts").height(h - 110);
		js.JQuery("#myContacts").height(h);
		this.updateShadows();
	}
	,refresh: function() {
		this.send(false);
		js.JQuery("#buttonRefresh").css("opacity","0.3");
		haxe_Timer.delay(function() {
			js.JQuery("#buttonRefresh").css("opacity","1");
		},1000);
	}
	,sendNew: function() {
		var peers = new List();
		var $it0 = (function($this) {
			var $r;
			var _this = js.JQuery("#threadPeers li.peer");
			$r = (_this.iterator)();
			return $r;
		}(this));
		while( $it0.hasNext() ) {
			var p = $it0.next();
			peers.add(p.attr("tid_id"));
		}
		var h = this.app.http(this.baseUrl + "sendNew");
		h.setParameter("with",peers.join(","));
		var val = this.getSafeText();
		if(val == null) return;
		h.setParameter("msg",val);
		h.setParameter("title",js.JQuery("input[name=title]").val());
		h.onData = function(d) {
			js.JQuery("body").append(d);
		};
		h.request();
	}
	,send: function(send) {
		if(send == null) send = true;
		var _g = this;
		var u = this.baseUrl + "send/" + js.JQuery("#discussThreadId").val();
		var idx = js.JQuery("#discussLastIdx").val();
		if(idx != null) u += "/" + idx;
		var h = this.app.http(u);
		h.setParameter("full",Std.string(this.full));
		h.onData = function(d) {
			var q = _g.updateThread(d);
			if(q.filter(".discussMsg").length > 0) {
				js.JQuery("textarea#discussInput").val("");
				js.JQuery("#discussLastIdx").remove();
				js.JQuery("#discussMinIdx").remove();
				var q2 = q.wrap("<body>").parent();
				if(q2.find(".discussMsg").length > 0) {
					js.JQuery("#discussThread .buttonHide").removeClass("off");
					js.JQuery("#discussThread .buttonDelete").removeClass("off");
				}
				if(q2.find(".discussMsg.me.new").length > 0) js.JQuery("#discussMsgs .discussMsg.new").removeClass("new").find(".tid_newIcon").remove(); else if(q2.find(".discussMsg.other.new").length > 0) js.JQuery("#discussMsgs .discussMsg.me.new").removeClass("new").find(".tid_newIcon").remove();
				q.unwrap();
				q.hide().prependTo("#discussMsgs").filter("div").slideDown(null,$bind(_g,_g.updateShadows));
			}
		};
		if(send) {
			var val = this.getSafeText();
			if(val == null) return;
			h.setParameter("msg",val);
			js.JQuery("#discussMsgs .noMessage").hide();
			js.JQuery("#discussMsgs .discussMsg.other.new").removeClass("new").find(".tid_newIcon").remove();
		}
		h.request();
	}
	,getSafeText: function() {
		var i = js.JQuery("textarea#discussInput");
		var val = i.val();
		var safe = js.JQuery("#discussSafe");
		safe.hide();
		if(safe.length > 0 && val.indexOf(safe.attr("tid_login")) >= 0) {
			safe.show();
			return null;
		}
		return val;
	}
	,reset: function() {
		var e = js.JQuery("#discussThread");
		e.find(".lcontainer").html("");
		e.find(".newPost input[type=text]").val("").focus();
		js.JQuery("#discussThreads .lcontainer .selected").removeClass("selected");
	}
	,loadAfter: function() {
		var _g = this;
		var s = Std.parseInt(js.JQuery("#discussStartIdx").val());
		var m = Std.parseInt(js.JQuery("#discussMinIdx").val());
		if(s == null || s <= m) return;
		js.JQuery("#discussStartIdx").remove();
		var e = js.JQuery("#discussMsgs");
		e.find(".buttonAutoScroll").remove();
		var h = this.app.http(this.baseUrl + "prev/" + js.JQuery("#discussThreadId").val() + "/" + s);
		e.find(".loading").show();
		h.onData = function(d) {
			js.JQuery("#discussMinIdx").remove();
			e.find(".loading").remove();
			var elem = js.JQuery(d);
			if(elem.filter("head").length == 0) {
				e.append(elem);
				_g.parseMessages(e);
			}
			_g.updateShadows();
		};
		h.request();
	}
	,popFull: function() {
		var f = js.JQuery("#formDiscussFull");
		var i = js.JQuery("#discussThread .lcontainer").attr("id");
		var r = new EReg("discussPanelThread_([0-9]+)","");
		if(r.match(i)) f.append("<input type=\"hidden\" name=\"thread\" value=\"" + r.matched(1) + "\"/>"); else if(i == "" && js.JQuery("#threadPeers li.peer").length > 0) {
			var peers = new List();
			var $it0 = (function($this) {
				var $r;
				var _this = js.JQuery("#threadPeers li.peer");
				$r = (_this.iterator)();
				return $r;
			}(this));
			while( $it0.hasNext() ) {
				var p = $it0.next();
				peers.add(Std.parseInt(p.attr("tid_id")));
			}
			f.append("<input type=\"hidden\" name=\"with\" value=\"" + peers.join(",") + "\"/>");
		}
		f.append(js.JQuery("<textarea name=\"msg\" style=\"display: none;\"></textarea>").val(js.JQuery("#discussInput").val()));
		f.submit();
	}
	,parseMessages: function(parent) {
		parent.find(".content a").attr("target","_blank");
	}
	,activePanel: function(p) {
		if(p == "discussThread") {
			js.JQuery("#discussThread").addClass("active");
			js.JQuery("#discussThreads").removeClass("active");
		} else {
			js.JQuery("#discussThreads").addClass("active");
			js.JQuery("#discussThread").removeClass("active");
		}
	}
	,__class__: tid_Discuss
};
var tid_GroupStyle = function() {
	this.values = new haxe_ds_StringMap();
};
$hxClasses["tid.GroupStyle"] = tid_GroupStyle;
tid_GroupStyle.__name__ = true;
tid_GroupStyle.j = function(r) {
	return js.JQuery(r);
};
tid_GroupStyle.prototype = {
	init: function() {
		var $it0 = (function($this) {
			var $r;
			var _this = js.JQuery("form input");
			$r = (_this.iterator)();
			return $r;
		}(this));
		while( $it0.hasNext() ) {
			var inp = $it0.next();
			var n = inp.attr("name");
			if(n == null || HxOverrides.substr(n,0,4) == "use_") continue;
			var $use = js.JQuery("input[name=use_" + n + "]");
			if($use["is"](":checked")) inp.change();
		}
	}
	,updateCSS: function() {
		var values = new haxe_ds_StringMap();
		var form = js.JQuery("form.styleEditor");
		var datas = [];
		var gid = 0;
		while(true) {
			var sid = 0;
			var a = [];
			while(true) {
				var id = "s" + gid + "_" + sid;
				var chk = form.find("input[name=use_" + id + "]");
				if(chk.length == 0) break;
				if(chk["is"](":checked")) {
					var inp = form.find("input[name=" + id + "]");
					var v = inp.val();
					if(v == "") values.remove(id); else {
						var css = inp.attr("gs_css");
						var prefix = inp.attr("gs_prefix");
						var value = css.split("$v").join(prefix + v);
						if(__map_reserved[id] != null) values.setReserved(id,value); else values.h[id] = value;
					}
				} else values.remove(id);
				sid++;
			}
			if(sid == 0) break;
			gid++;
		}
		var s = "";
		var $it0 = new haxe_ds__$StringMap_StringMapIterator(values,values.arrayKeys());
		while( $it0.hasNext() ) {
			var v1 = $it0.next();
			s += v1;
		}
		js.JQuery("#groupStyle").html(s);
	}
	,'use': function(id,flag) {
		var inp = js.JQuery("#" + id);
		if(inp == null) return;
		if(flag) inp.show(); else inp.hide();
		this.updateCSS();
	}
	,stringify: function() {
		var form = js.JQuery("form.styleEditor");
		var datas = [];
		var gid = 0;
		while(true) {
			var sid = 0;
			var a = [];
			while(true) {
				var id = "s" + gid + "_" + sid;
				var chk = form.find("input[name=use_" + id + "]");
				if(chk.length == 0) break;
				var v = null;
				if(chk["is"](":checked")) v = form.find("input[name=" + id + "]").val();
				a.push(v);
				sid++;
			}
			if(sid == 0) break;
			datas.push(a);
			gid++;
		}
		return JSON.stringify(datas);
	}
	,parse: function(s) {
		var form = js.JQuery("form.styleEditor");
		try {
			var datas = JSON.parse(s);
			var _g1 = 0;
			var _g = datas.length;
			while(_g1 < _g) {
				var gid = _g1++;
				var g = datas[gid];
				var _g3 = 0;
				var _g2 = g.length;
				while(_g3 < _g2) {
					var sid = _g3++;
					var id = "s" + gid + "_" + sid;
					var v = g[sid];
					var chk = form.find("input[name=use_" + id + "]");
					var input = form.find("input[name=" + id + "]");
					if(v == null) {
						if(chk["is"](":checked")) chk.click();
						input.val("");
					} else {
						if(!chk["is"](":checked")) chk.click();
						input.val(v);
					}
				}
			}
			this.updateCSS();
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			mt_js_Twinoid.notice("Import error");
		}
	}
	,popupExport: function() {
		var html = "<textarea id=\"gstyleExport\" style=\"width: 480px; height: 100px; resize: none;\">" + this.stringify().split("[[").join("[\n\t[").split("],[").join("],\n\t[").split("]]").join("]\n]") + "</textarea>";
		mt_js_Twinoid.call("notice",[html]);
		try {
			js.JQuery("#gstyleExport")[0].select();
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
		}
	}
	,popupImport: function() {
		var _g = this;
		var html = "<div id=\"gstyleImport\">";
		html += "<textarea style=\"width: 480px; height: 100px; resize: none;\"></textarea>";
		html += "<button>Import</button>";
		html += "</div>";
		js_Lib.window._tid.notice(html);
		js.JQuery("#gstyleImport button").click(function(e) {
			_g.parse(js.JQuery(this).prev("textarea").val());
			js_Lib.window._tid.hideNotice();
		});
	}
	,__class__: tid_GroupStyle
};
var tid_PressKitEditor = function(uploaderParams) {
	var _g = this;
	this.uploadParams = uploaderParams;
	this.root = js.JQuery(".adminPkEditor");
	this.skel = tid_PressKitEditor.j(js.JQuery.parseXML(this.root.find(".skel").val())).children();
	this.dbXml = tid_PressKitEditor.j(js.JQuery.parseXML(this.root.find(".dbXml").val())).children();
	this.editor = this.root.find(".editor");
	this.clearForm();
	this.buildForm(this.editor,this.dbXml.length > 0?this.dbXml:this.skel);
	this.root.find(".defaultEditor input[type=submit]").click(function(e) {
		_g.submit();
	});
	this.root.find("button").click(function(e1) {
		e1.preventDefault();
	});
	this.root.find("[name=editXml]").click(function(e2) {
		e2.preventDefault();
		js.JQuery(".defaultEditor, .rawEditor").toggle();
		var xml = _g.toXml(true);
		_g.root.find(".dbXml").val(xml);
	});
	this.root.find(".rawEditor button[name=reset]").click(function(_) {
		_g.root.find(".dbXml").val(_g.root.find(".skel").val());
	});
	this.root.find(".rawEditor input[type=submit]").click(function(e3) {
		e3.preventDefault();
		var old = _g.dbXml;
		try {
			_g.dbXml = tid_PressKitEditor.j(js.JQuery.parseXML(_g.root.find(".dbXml").val())).children();
			js.JQuery(".defaultEditor, .rawEditor").toggle();
			_g.clearForm();
			_g.buildForm(_g.editor,_g.dbXml);
		} catch( e4 ) {
			if (e4 instanceof js__$Boot_HaxeError) e4 = e4.val;
			js_Browser.alert("ERROR: " + Std.string(e4));
			_g.dbXml = old;
		}
	});
};
$hxClasses["tid.PressKitEditor"] = tid_PressKitEditor;
tid_PressKitEditor.__name__ = true;
tid_PressKitEditor.j = function(r) {
	return js.JQuery(r);
};
tid_PressKitEditor.prototype = {
	submit: function() {
		this.cleanUp();
		var xml = this.toXml(false);
		js.JQuery("input[name=xml]").val(xml);
	}
	,clearForm: function() {
		js.JQuery(".editor").empty();
	}
	,buildForm: function(ctx,skel) {
		var _g = this;
		var name = skel.get(0).nodeName;
		var depth = ctx.parentsUntil("form").length;
		var div = js.JQuery("<div/>");
		div.addClass("row");
		div.addClass("depth" + depth);
		div.attr("node",name);
		ctx.append(div);
		if(skel.children().length == 0) {
			var label = js.JQuery("<label>" + name + "</label>");
			div.append(label);
			var input = js.JQuery("<textarea/>");
			input.val(skel.text());
			div.append(input);
			input.keyup(function(e) {
				if(input.innerHeight() < input.get(0).scrollHeight) input.height(input.get(0).scrollHeight);
			});
			input.keyup();
			if(name == "url") {
				var node = div.find("textarea:first");
				mt_js_Twinoid.call("initDropZone",[node,this.uploadParams,function(url,isError) {
					if(!isError && url != null && url != "") node.val(window._tid.IMGUP + "" + url); else js_Browser.alert("Upload impossible. Fichier trop volumineux? 2Mo maximum !");
				}]);
			}
		} else {
			div.attr("children","1");
			div.append("<h2>" + name + "</h2>");
			if(skel.children().length > 0) {
				div.addClass("block");
				var $it0 = (function($this) {
					var $r;
					var _this = skel.children();
					$r = (_this.iterator)();
					return $r;
				}(this));
				while( $it0.hasNext() ) {
					var c = $it0.next();
					this.buildForm(div,c);
				}
			}
			if(depth == 1) {
				var del = js.JQuery("<a href=\"#\" class=\"action delete\">x</a>");
				del.click(function(e1) {
					var div1 = js.JQuery(this).closest("div");
					e1.preventDefault();
					if(div1.siblings("div").length > 0) div1.detach(); else div1.find("textarea").val("");
				});
				div.find(".depth2 h2, .depth2:not([children])").append(del);
				var more = js.JQuery("<a href=\"#\" class=\"action more\">+ " + name + "</a>");
				more.click(function(e2) {
					e2.preventDefault();
					var extra = div.children("div").first().clone(true,true);
					extra.find("textarea").val("");
					extra.insertBefore(more);
					var node1 = extra.find("> div[node='url'] textarea");
					console.log("node:" + Std.string(node1));
					if(node1 != null) mt_js_Twinoid.call("initDropZone",[node1,_g.uploadParams,function(url1,isError1) {
						console.log("upload done, error ? " + (isError1 == null?"null":"" + isError1) + ", url:" + url1);
						if(!isError1 && url1 != null && url1 != "") node1.val(window._tid.IMGUP + "" + url1);
					}]);
				});
				div.append(more);
			}
		}
	}
	,cleanUp: function() {
		var $it0 = (function($this) {
			var $r;
			var _this = js.JQuery(".block.depth1");
			$r = (_this.iterator)();
			return $r;
		}(this));
		while( $it0.hasNext() ) {
			var d1 = $it0.next();
			var blocks = d1.find(".depth2");
			var $it1 = (blocks.iterator)();
			while( $it1.hasNext() ) {
				var b = $it1.next();
				if(d1.find(".depth2").length == 1) break;
				var empty = true;
				var $it2 = (function($this) {
					var $r;
					var _this1 = b.find("textarea");
					$r = (_this1.iterator)();
					return $r;
				}(this));
				while( $it2.hasNext() ) {
					var input = $it2.next();
					var v = StringTools.trim(input.val());
					if(v != null && v != "") empty = false;
				}
				if(empty) b.detach();
			}
		}
	}
	,indent: function(n) {
		var str = "";
		var _g = 0;
		while(_g < n) {
			var i = _g++;
			str += "\t";
		}
		return str;
	}
	,toXml: function(pretty) {
		var xml = tid_PressKitEditor.j(js.JQuery.parseXML("<root xmlns=\"http://www.w3.org/1999/xhtml\"/>"));
		this.buildXml(xml.find("root"),this.editor.children("[node]"));
		var s = new XMLSerializer();
		var out = s.serializeToString(xml.context);
		var parts = out.split("game");
		parts.shift();
		parts.pop();
		var xml1 = "<game" + parts.join("game") + "game>";
		if(!pretty) return xml1; else {
			var out1 = "";
			var depth = -1;
			var closing = false;
			var _g1 = 0;
			var _g = xml1.length;
			while(_g1 < _g) {
				var i = _g1++;
				var c = xml1.charAt(i);
				if(c == "<" && xml1.charAt(i + 1) != "/") {
					depth++;
					out1 += "\n" + this.indent(depth) + c;
				} else if(c == "<" && xml1.charAt(i + 1) == "/") {
					closing = true;
					out1 += c;
				} else if(c == ">" && closing) {
					closing = false;
					depth--;
					out1 += ">\n" + this.indent(depth);
				} else out1 += c;
			}
			out1 = out1.split("\n").filter(function(l) {
				return StringTools.trim(l).length > 0;
			}).join("\n");
			return out1;
		}
	}
	,buildXml: function(xml,divs) {
		var $it0 = (divs.iterator)();
		while( $it0.hasNext() ) {
			var div = $it0.next();
			var name = div.attr("node");
			var node = js.JQuery("<" + name + "/>");
			xml.append(node);
			if(div.find("[node]").length > 0) this.buildXml(node,div.children("[node]")); else {
				var v = StringTools.trim(div.find("textarea").val());
				if(v != null && v != "") node.text(v);
			}
		}
	}
	,__class__: tid_PressKitEditor
};
var tid_UserAgent = function(ua) {
	if(ua == null) ua = window.navigator.userAgent;
	this.ua = ua;
};
$hxClasses["tid.UserAgent"] = tid_UserAgent;
tid_UserAgent.__name__ = true;
tid_UserAgent.prototype = {
	__class__: tid_UserAgent
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
$hxClasses.Math = Math;
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = true;
$hxClasses.Array = Array;
Array.__name__ = true;
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
if(Array.prototype.filter == null) Array.prototype.filter = function(f1) {
	var a1 = [];
	var _g11 = 0;
	var _g2 = this.length;
	while(_g11 < _g2) {
		var i1 = _g11++;
		var e = this[i1];
		if(f1(e)) a1.push(e);
	}
	return a1;
};
var __map_reserved = {}
var q = window.jQuery;
var js = js || {}
js.JQuery = q;
q.fn.iterator = function() {
	return { pos : 0, j : this, hasNext : function() {
		return this.pos < this.j.length;
	}, next : function() {
		return $(this.j[this.pos++]);
	}};
};
js.SWFObject = deconcept.SWFObject;
var ArrayBuffer = $global.ArrayBuffer || js_html_compat_ArrayBuffer;
if(ArrayBuffer.prototype.slice == null) ArrayBuffer.prototype.slice = js_html_compat_ArrayBuffer.sliceImpl;
var DataView = $global.DataView || js_html_compat_DataView;
var Uint8Array = $global.Uint8Array || js_html_compat_Uint8Array._new;
var win = window;
if(win.mt == null) win.mt = { };
if(win.mt.js == null) win.mt.js = { };
win.mt.js.Twinoid = mt_js_Twinoid;
/*! jQuery UI - v1.10.3 - 2013-07-10
* http://jqueryui.com
* Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.sortable.js
* Copyright 2013 jQuery Foundation and other contributors Licensed MIT */

(function(e,t){function i(t,i){var a,n,r,o=t.nodeName.toLowerCase();return"area"===o?(a=t.parentNode,n=a.name,t.href&&n&&"map"===a.nodeName.toLowerCase()?(r=e("img[usemap=#"+n+"]")[0],!!r&&s(r)):!1):(/input|select|textarea|button|object/.test(o)?!t.disabled:"a"===o?t.href||i:i)&&s(t)}function s(t){return e.expr.filters.visible(t)&&!e(t).parents().addBack().filter(function(){return"hidden"===e.css(this,"visibility")}).length}var a=0,n=/^ui-id-\d+$/;e.ui=e.ui||{},e.extend(e.ui,{version:"1.10.3",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),e.fn.extend({focus:function(t){return function(i,s){return"number"==typeof i?this.each(function(){var t=this;setTimeout(function(){e(t).focus(),s&&s.call(t)},i)}):t.apply(this,arguments)}}(e.fn.focus),scrollParent:function(){var t;return t=e.ui.ie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(e.css(this,"position"))&&/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0),/fixed/.test(this.css("position"))||!t.length?e(document):t},zIndex:function(i){if(i!==t)return this.css("zIndex",i);if(this.length)for(var s,a,n=e(this[0]);n.length&&n[0]!==document;){if(s=n.css("position"),("absolute"===s||"relative"===s||"fixed"===s)&&(a=parseInt(n.css("zIndex"),10),!isNaN(a)&&0!==a))return a;n=n.parent()}return 0},uniqueId:function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++a)})},removeUniqueId:function(){return this.each(function(){n.test(this.id)&&e(this).removeAttr("id")})}}),e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(i){return!!e.data(i,t)}}):function(t,i,s){return!!e.data(t,s[3])},focusable:function(t){return i(t,!isNaN(e.attr(t,"tabindex")))},tabbable:function(t){var s=e.attr(t,"tabindex"),a=isNaN(s);return(a||s>=0)&&i(t,!a)}}),e("<a>").outerWidth(1).jquery||e.each(["Width","Height"],function(i,s){function a(t,i,s,a){return e.each(n,function(){i-=parseFloat(e.css(t,"padding"+this))||0,s&&(i-=parseFloat(e.css(t,"border"+this+"Width"))||0),a&&(i-=parseFloat(e.css(t,"margin"+this))||0)}),i}var n="Width"===s?["Left","Right"]:["Top","Bottom"],r=s.toLowerCase(),o={innerWidth:e.fn.innerWidth,innerHeight:e.fn.innerHeight,outerWidth:e.fn.outerWidth,outerHeight:e.fn.outerHeight};e.fn["inner"+s]=function(i){return i===t?o["inner"+s].call(this):this.each(function(){e(this).css(r,a(this,i)+"px")})},e.fn["outer"+s]=function(t,i){return"number"!=typeof t?o["outer"+s].call(this,t):this.each(function(){e(this).css(r,a(this,t,!0,i)+"px")})}}),e.fn.addBack||(e.fn.addBack=function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}),e("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(e.fn.removeData=function(t){return function(i){return arguments.length?t.call(this,e.camelCase(i)):t.call(this)}}(e.fn.removeData)),e.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),e.support.selectstart="onselectstart"in document.createElement("div"),e.fn.extend({disableSelection:function(){return this.bind((e.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(e){e.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),e.extend(e.ui,{plugin:{add:function(t,i,s){var a,n=e.ui[t].prototype;for(a in s)n.plugins[a]=n.plugins[a]||[],n.plugins[a].push([i,s[a]])},call:function(e,t,i){var s,a=e.plugins[t];if(a&&e.element[0].parentNode&&11!==e.element[0].parentNode.nodeType)for(s=0;a.length>s;s++)e.options[a[s][0]]&&a[s][1].apply(e.element,i)}},hasScroll:function(t,i){if("hidden"===e(t).css("overflow"))return!1;var s=i&&"left"===i?"scrollLeft":"scrollTop",a=!1;return t[s]>0?!0:(t[s]=1,a=t[s]>0,t[s]=0,a)}})})(jQuery);(function(e,t){var i=0,s=Array.prototype.slice,n=e.cleanData;e.cleanData=function(t){for(var i,s=0;null!=(i=t[s]);s++)try{e(i).triggerHandler("remove")}catch(a){}n(t)},e.widget=function(i,s,n){var a,r,o,h,l={},u=i.split(".")[0];i=i.split(".")[1],a=u+"-"+i,n||(n=s,s=e.Widget),e.expr[":"][a.toLowerCase()]=function(t){return!!e.data(t,a)},e[u]=e[u]||{},r=e[u][i],o=e[u][i]=function(e,i){return this._createWidget?(arguments.length&&this._createWidget(e,i),t):new o(e,i)},e.extend(o,r,{version:n.version,_proto:e.extend({},n),_childConstructors:[]}),h=new s,h.options=e.widget.extend({},h.options),e.each(n,function(i,n){return e.isFunction(n)?(l[i]=function(){var e=function(){return s.prototype[i].apply(this,arguments)},t=function(e){return s.prototype[i].apply(this,e)};return function(){var i,s=this._super,a=this._superApply;return this._super=e,this._superApply=t,i=n.apply(this,arguments),this._super=s,this._superApply=a,i}}(),t):(l[i]=n,t)}),o.prototype=e.widget.extend(h,{widgetEventPrefix:r?h.widgetEventPrefix:i},l,{constructor:o,namespace:u,widgetName:i,widgetFullName:a}),r?(e.each(r._childConstructors,function(t,i){var s=i.prototype;e.widget(s.namespace+"."+s.widgetName,o,i._proto)}),delete r._childConstructors):s._childConstructors.push(o),e.widget.bridge(i,o)},e.widget.extend=function(i){for(var n,a,r=s.call(arguments,1),o=0,h=r.length;h>o;o++)for(n in r[o])a=r[o][n],r[o].hasOwnProperty(n)&&a!==t&&(i[n]=e.isPlainObject(a)?e.isPlainObject(i[n])?e.widget.extend({},i[n],a):e.widget.extend({},a):a);return i},e.widget.bridge=function(i,n){var a=n.prototype.widgetFullName||i;e.fn[i]=function(r){var o="string"==typeof r,h=s.call(arguments,1),l=this;return r=!o&&h.length?e.widget.extend.apply(null,[r].concat(h)):r,o?this.each(function(){var s,n=e.data(this,a);return n?e.isFunction(n[r])&&"_"!==r.charAt(0)?(s=n[r].apply(n,h),s!==n&&s!==t?(l=s&&s.jquery?l.pushStack(s.get()):s,!1):t):e.error("no such method '"+r+"' for "+i+" widget instance"):e.error("cannot call methods on "+i+" prior to initialization; "+"attempted to call method '"+r+"'")}):this.each(function(){var t=e.data(this,a);t?t.option(r||{})._init():e.data(this,a,new n(r,this))}),l}},e.Widget=function(){},e.Widget._childConstructors=[],e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(t,s){s=e(s||this.defaultElement||this)[0],this.element=e(s),this.uuid=i++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=e.widget.extend({},this.options,this._getCreateOptions(),t),this.bindings=e(),this.hoverable=e(),this.focusable=e(),s!==this&&(e.data(s,this.widgetFullName,this),this._on(!0,this.element,{remove:function(e){e.target===s&&this.destroy()}}),this.document=e(s.style?s.ownerDocument:s.document||s),this.window=e(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:e.noop,_getCreateEventData:e.noop,_create:e.noop,_init:e.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:e.noop,widget:function(){return this.element},option:function(i,s){var n,a,r,o=i;if(0===arguments.length)return e.widget.extend({},this.options);if("string"==typeof i)if(o={},n=i.split("."),i=n.shift(),n.length){for(a=o[i]=e.widget.extend({},this.options[i]),r=0;n.length-1>r;r++)a[n[r]]=a[n[r]]||{},a=a[n[r]];if(i=n.pop(),s===t)return a[i]===t?null:a[i];a[i]=s}else{if(s===t)return this.options[i]===t?null:this.options[i];o[i]=s}return this._setOptions(o),this},_setOptions:function(e){var t;for(t in e)this._setOption(t,e[t]);return this},_setOption:function(e,t){return this.options[e]=t,"disabled"===e&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!t).attr("aria-disabled",t),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(i,s,n){var a,r=this;"boolean"!=typeof i&&(n=s,s=i,i=!1),n?(s=a=e(s),this.bindings=this.bindings.add(s)):(n=s,s=this.element,a=this.widget()),e.each(n,function(n,o){function h(){return i||r.options.disabled!==!0&&!e(this).hasClass("ui-state-disabled")?("string"==typeof o?r[o]:o).apply(r,arguments):t}"string"!=typeof o&&(h.guid=o.guid=o.guid||h.guid||e.guid++);var l=n.match(/^(\w+)\s*(.*)$/),u=l[1]+r.eventNamespace,c=l[2];c?a.delegate(c,u,h):s.bind(u,h)})},_off:function(e,t){t=(t||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.unbind(t).undelegate(t)},_delay:function(e,t){function i(){return("string"==typeof e?s[e]:e).apply(s,arguments)}var s=this;return setTimeout(i,t||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){e(t.currentTarget).addClass("ui-state-hover")},mouseleave:function(t){e(t.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){e(t.currentTarget).addClass("ui-state-focus")},focusout:function(t){e(t.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(t,i,s){var n,a,r=this.options[t];if(s=s||{},i=e.Event(i),i.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),i.target=this.element[0],a=i.originalEvent)for(n in a)n in i||(i[n]=a[n]);return this.element.trigger(i,s),!(e.isFunction(r)&&r.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented())}},e.each({show:"fadeIn",hide:"fadeOut"},function(t,i){e.Widget.prototype["_"+t]=function(s,n,a){"string"==typeof n&&(n={effect:n});var r,o=n?n===!0||"number"==typeof n?i:n.effect||i:t;n=n||{},"number"==typeof n&&(n={duration:n}),r=!e.isEmptyObject(n),n.complete=a,n.delay&&s.delay(n.delay),r&&e.effects&&e.effects.effect[o]?s[t](n):o!==t&&s[o]?s[o](n.duration,n.easing,a):s.queue(function(i){e(this)[t](),a&&a.call(s[0]),i()})}})})(jQuery);(function(e){var t=!1;e(document).mouseup(function(){t=!1}),e.widget("ui.mouse",{version:"1.10.3",options:{cancel:"input,textarea,button,select,option",distance:1,delay:0},_mouseInit:function(){var t=this;this.element.bind("mousedown."+this.widgetName,function(e){return t._mouseDown(e)}).bind("click."+this.widgetName,function(i){return!0===e.data(i.target,t.widgetName+".preventClickEvent")?(e.removeData(i.target,t.widgetName+".preventClickEvent"),i.stopImmediatePropagation(),!1):undefined}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&e(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(i){if(!t){this._mouseStarted&&this._mouseUp(i),this._mouseDownEvent=i;var s=this,n=1===i.which,a="string"==typeof this.options.cancel&&i.target.nodeName?e(i.target).closest(this.options.cancel).length:!1;return n&&!a&&this._mouseCapture(i)?(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){s.mouseDelayMet=!0},this.options.delay)),this._mouseDistanceMet(i)&&this._mouseDelayMet(i)&&(this._mouseStarted=this._mouseStart(i)!==!1,!this._mouseStarted)?(i.preventDefault(),!0):(!0===e.data(i.target,this.widgetName+".preventClickEvent")&&e.removeData(i.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(e){return s._mouseMove(e)},this._mouseUpDelegate=function(e){return s._mouseUp(e)},e(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),i.preventDefault(),t=!0,!0)):!0}},_mouseMove:function(t){return e.ui.ie&&(!document.documentMode||9>document.documentMode)&&!t.button?this._mouseUp(t):this._mouseStarted?(this._mouseDrag(t),t.preventDefault()):(this._mouseDistanceMet(t)&&this._mouseDelayMet(t)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,t)!==!1,this._mouseStarted?this._mouseDrag(t):this._mouseUp(t)),!this._mouseStarted)},_mouseUp:function(t){return e(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,t.target===this._mouseDownEvent.target&&e.data(t.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(t)),!1},_mouseDistanceMet:function(e){return Math.max(Math.abs(this._mouseDownEvent.pageX-e.pageX),Math.abs(this._mouseDownEvent.pageY-e.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}})})(jQuery);(function(t){function e(t,e,i){return t>e&&e+i>t}function i(t){return/left|right/.test(t.css("float"))||/inline|table-cell/.test(t.css("display"))}t.widget("ui.sortable",t.ui.mouse,{version:"1.10.3",widgetEventPrefix:"sort",ready:!1,options:{appendTo:"parent",axis:!1,connectWith:!1,containment:!1,cursor:"auto",cursorAt:!1,dropOnEmpty:!0,forcePlaceholderSize:!1,forceHelperSize:!1,grid:!1,handle:!1,helper:"original",items:"> *",opacity:!1,placeholder:!1,revert:!1,scroll:!0,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1e3,activate:null,beforeStop:null,change:null,deactivate:null,out:null,over:null,receive:null,remove:null,sort:null,start:null,stop:null,update:null},_create:function(){var t=this.options;this.containerCache={},this.element.addClass("ui-sortable"),this.refresh(),this.floating=this.items.length?"x"===t.axis||i(this.items[0].item):!1,this.offset=this.element.offset(),this._mouseInit(),this.ready=!0},_destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled"),this._mouseDestroy();for(var t=this.items.length-1;t>=0;t--)this.items[t].item.removeData(this.widgetName+"-item");return this},_setOption:function(e,i){"disabled"===e?(this.options[e]=i,this.widget().toggleClass("ui-sortable-disabled",!!i)):t.Widget.prototype._setOption.apply(this,arguments)},_mouseCapture:function(e,i){var s=null,n=!1,a=this;return this.reverting?!1:this.options.disabled||"static"===this.options.type?!1:(this._refreshItems(e),t(e.target).parents().each(function(){return t.data(this,a.widgetName+"-item")===a?(s=t(this),!1):undefined}),t.data(e.target,a.widgetName+"-item")===a&&(s=t(e.target)),s?!this.options.handle||i||(t(this.options.handle,s).find("*").addBack().each(function(){this===e.target&&(n=!0)}),n)?(this.currentItem=s,this._removeCurrentsFromItems(),!0):!1:!1)},_mouseStart:function(e,i,s){var n,a,o=this.options;if(this.currentContainer=this,this.refreshPositions(),this.helper=this._createHelper(e),this._cacheHelperProportions(),this._cacheMargins(),this.scrollParent=this.helper.scrollParent(),this.offset=this.currentItem.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},t.extend(this.offset,{click:{left:e.pageX-this.offset.left,top:e.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.helper.css("position","absolute"),this.cssPosition=this.helper.css("position"),this.originalPosition=this._generatePosition(e),this.originalPageX=e.pageX,this.originalPageY=e.pageY,o.cursorAt&&this._adjustOffsetFromHelper(o.cursorAt),this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]},this.helper[0]!==this.currentItem[0]&&this.currentItem.hide(),this._createPlaceholder(),o.containment&&this._setContainment(),o.cursor&&"auto"!==o.cursor&&(a=this.document.find("body"),this.storedCursor=a.css("cursor"),a.css("cursor",o.cursor),this.storedStylesheet=t("<style>*{ cursor: "+o.cursor+" !important; }</style>").appendTo(a)),o.opacity&&(this.helper.css("opacity")&&(this._storedOpacity=this.helper.css("opacity")),this.helper.css("opacity",o.opacity)),o.zIndex&&(this.helper.css("zIndex")&&(this._storedZIndex=this.helper.css("zIndex")),this.helper.css("zIndex",o.zIndex)),this.scrollParent[0]!==document&&"HTML"!==this.scrollParent[0].tagName&&(this.overflowOffset=this.scrollParent.offset()),this._trigger("start",e,this._uiHash()),this._preserveHelperProportions||this._cacheHelperProportions(),!s)for(n=this.containers.length-1;n>=0;n--)this.containers[n]._trigger("activate",e,this._uiHash(this));return t.ui.ddmanager&&(t.ui.ddmanager.current=this),t.ui.ddmanager&&!o.dropBehaviour&&t.ui.ddmanager.prepareOffsets(this,e),this.dragging=!0,this.helper.addClass("ui-sortable-helper"),this._mouseDrag(e),!0},_mouseDrag:function(e){var i,s,n,a,o=this.options,r=!1;for(this.position=this._generatePosition(e),this.positionAbs=this._convertPositionTo("absolute"),this.lastPositionAbs||(this.lastPositionAbs=this.positionAbs),this.options.scroll&&(this.scrollParent[0]!==document&&"HTML"!==this.scrollParent[0].tagName?(this.overflowOffset.top+this.scrollParent[0].offsetHeight-e.pageY<o.scrollSensitivity?this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop+o.scrollSpeed:e.pageY-this.overflowOffset.top<o.scrollSensitivity&&(this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop-o.scrollSpeed),this.overflowOffset.left+this.scrollParent[0].offsetWidth-e.pageX<o.scrollSensitivity?this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft+o.scrollSpeed:e.pageX-this.overflowOffset.left<o.scrollSensitivity&&(this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft-o.scrollSpeed)):(e.pageY-t(document).scrollTop()<o.scrollSensitivity?r=t(document).scrollTop(t(document).scrollTop()-o.scrollSpeed):t(window).height()-(e.pageY-t(document).scrollTop())<o.scrollSensitivity&&(r=t(document).scrollTop(t(document).scrollTop()+o.scrollSpeed)),e.pageX-t(document).scrollLeft()<o.scrollSensitivity?r=t(document).scrollLeft(t(document).scrollLeft()-o.scrollSpeed):t(window).width()-(e.pageX-t(document).scrollLeft())<o.scrollSensitivity&&(r=t(document).scrollLeft(t(document).scrollLeft()+o.scrollSpeed))),r!==!1&&t.ui.ddmanager&&!o.dropBehaviour&&t.ui.ddmanager.prepareOffsets(this,e)),this.positionAbs=this._convertPositionTo("absolute"),this.options.axis&&"y"===this.options.axis||(this.helper[0].style.left=this.position.left+"px"),this.options.axis&&"x"===this.options.axis||(this.helper[0].style.top=this.position.top+"px"),i=this.items.length-1;i>=0;i--)if(s=this.items[i],n=s.item[0],a=this._intersectsWithPointer(s),a&&s.instance===this.currentContainer&&n!==this.currentItem[0]&&this.placeholder[1===a?"next":"prev"]()[0]!==n&&!t.contains(this.placeholder[0],n)&&("semi-dynamic"===this.options.type?!t.contains(this.element[0],n):!0)){if(this.direction=1===a?"down":"up","pointer"!==this.options.tolerance&&!this._intersectsWithSides(s))break;this._rearrange(e,s),this._trigger("change",e,this._uiHash());break}return this._contactContainers(e),t.ui.ddmanager&&t.ui.ddmanager.drag(this,e),this._trigger("sort",e,this._uiHash()),this.lastPositionAbs=this.positionAbs,!1},_mouseStop:function(e,i){if(e){if(t.ui.ddmanager&&!this.options.dropBehaviour&&t.ui.ddmanager.drop(this,e),this.options.revert){var s=this,n=this.placeholder.offset(),a=this.options.axis,o={};a&&"x"!==a||(o.left=n.left-this.offset.parent.left-this.margins.left+(this.offsetParent[0]===document.body?0:this.offsetParent[0].scrollLeft)),a&&"y"!==a||(o.top=n.top-this.offset.parent.top-this.margins.top+(this.offsetParent[0]===document.body?0:this.offsetParent[0].scrollTop)),this.reverting=!0,t(this.helper).animate(o,parseInt(this.options.revert,10)||500,function(){s._clear(e)})}else this._clear(e,i);return!1}},cancel:function(){if(this.dragging){this._mouseUp({target:null}),"original"===this.options.helper?this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper"):this.currentItem.show();for(var e=this.containers.length-1;e>=0;e--)this.containers[e]._trigger("deactivate",null,this._uiHash(this)),this.containers[e].containerCache.over&&(this.containers[e]._trigger("out",null,this._uiHash(this)),this.containers[e].containerCache.over=0)}return this.placeholder&&(this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]),"original"!==this.options.helper&&this.helper&&this.helper[0].parentNode&&this.helper.remove(),t.extend(this,{helper:null,dragging:!1,reverting:!1,_noFinalSort:null}),this.domPosition.prev?t(this.domPosition.prev).after(this.currentItem):t(this.domPosition.parent).prepend(this.currentItem)),this},serialize:function(e){var i=this._getItemsAsjQuery(e&&e.connected),s=[];return e=e||{},t(i).each(function(){var i=(t(e.item||this).attr(e.attribute||"id")||"").match(e.expression||/(.+)[\-=_](.+)/);i&&s.push((e.key||i[1]+"[]")+"="+(e.key&&e.expression?i[1]:i[2]))}),!s.length&&e.key&&s.push(e.key+"="),s.join("&")},toArray:function(e){var i=this._getItemsAsjQuery(e&&e.connected),s=[];return e=e||{},i.each(function(){s.push(t(e.item||this).attr(e.attribute||"id")||"")}),s},_intersectsWith:function(t){var e=this.positionAbs.left,i=e+this.helperProportions.width,s=this.positionAbs.top,n=s+this.helperProportions.height,a=t.left,o=a+t.width,r=t.top,h=r+t.height,l=this.offset.click.top,c=this.offset.click.left,u="x"===this.options.axis||s+l>r&&h>s+l,d="y"===this.options.axis||e+c>a&&o>e+c,p=u&&d;return"pointer"===this.options.tolerance||this.options.forcePointerForContainers||"pointer"!==this.options.tolerance&&this.helperProportions[this.floating?"width":"height"]>t[this.floating?"width":"height"]?p:e+this.helperProportions.width/2>a&&o>i-this.helperProportions.width/2&&s+this.helperProportions.height/2>r&&h>n-this.helperProportions.height/2},_intersectsWithPointer:function(t){var i="x"===this.options.axis||e(this.positionAbs.top+this.offset.click.top,t.top,t.height),s="y"===this.options.axis||e(this.positionAbs.left+this.offset.click.left,t.left,t.width),n=i&&s,a=this._getDragVerticalDirection(),o=this._getDragHorizontalDirection();return n?this.floating?o&&"right"===o||"down"===a?2:1:a&&("down"===a?2:1):!1},_intersectsWithSides:function(t){var i=e(this.positionAbs.top+this.offset.click.top,t.top+t.height/2,t.height),s=e(this.positionAbs.left+this.offset.click.left,t.left+t.width/2,t.width),n=this._getDragVerticalDirection(),a=this._getDragHorizontalDirection();return this.floating&&a?"right"===a&&s||"left"===a&&!s:n&&("down"===n&&i||"up"===n&&!i)},_getDragVerticalDirection:function(){var t=this.positionAbs.top-this.lastPositionAbs.top;return 0!==t&&(t>0?"down":"up")},_getDragHorizontalDirection:function(){var t=this.positionAbs.left-this.lastPositionAbs.left;return 0!==t&&(t>0?"right":"left")},refresh:function(t){return this._refreshItems(t),this.refreshPositions(),this},_connectWith:function(){var t=this.options;return t.connectWith.constructor===String?[t.connectWith]:t.connectWith},_getItemsAsjQuery:function(e){var i,s,n,a,o=[],r=[],h=this._connectWith();if(h&&e)for(i=h.length-1;i>=0;i--)for(n=t(h[i]),s=n.length-1;s>=0;s--)a=t.data(n[s],this.widgetFullName),a&&a!==this&&!a.options.disabled&&r.push([t.isFunction(a.options.items)?a.options.items.call(a.element):t(a.options.items,a.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),a]);for(r.push([t.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):t(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]),i=r.length-1;i>=0;i--)r[i][0].each(function(){o.push(this)});return t(o)},_removeCurrentsFromItems:function(){var e=this.currentItem.find(":data("+this.widgetName+"-item)");this.items=t.grep(this.items,function(t){for(var i=0;e.length>i;i++)if(e[i]===t.item[0])return!1;return!0})},_refreshItems:function(e){this.items=[],this.containers=[this];var i,s,n,a,o,r,h,l,c=this.items,u=[[t.isFunction(this.options.items)?this.options.items.call(this.element[0],e,{item:this.currentItem}):t(this.options.items,this.element),this]],d=this._connectWith();if(d&&this.ready)for(i=d.length-1;i>=0;i--)for(n=t(d[i]),s=n.length-1;s>=0;s--)a=t.data(n[s],this.widgetFullName),a&&a!==this&&!a.options.disabled&&(u.push([t.isFunction(a.options.items)?a.options.items.call(a.element[0],e,{item:this.currentItem}):t(a.options.items,a.element),a]),this.containers.push(a));for(i=u.length-1;i>=0;i--)for(o=u[i][1],r=u[i][0],s=0,l=r.length;l>s;s++)h=t(r[s]),h.data(this.widgetName+"-item",o),c.push({item:h,instance:o,width:0,height:0,left:0,top:0})},refreshPositions:function(e){this.offsetParent&&this.helper&&(this.offset.parent=this._getParentOffset());var i,s,n,a;for(i=this.items.length-1;i>=0;i--)s=this.items[i],s.instance!==this.currentContainer&&this.currentContainer&&s.item[0]!==this.currentItem[0]||(n=this.options.toleranceElement?t(this.options.toleranceElement,s.item):s.item,e||(s.width=n.outerWidth(),s.height=n.outerHeight()),a=n.offset(),s.left=a.left,s.top=a.top);if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(i=this.containers.length-1;i>=0;i--)a=this.containers[i].element.offset(),this.containers[i].containerCache.left=a.left,this.containers[i].containerCache.top=a.top,this.containers[i].containerCache.width=this.containers[i].element.outerWidth(),this.containers[i].containerCache.height=this.containers[i].element.outerHeight();return this},_createPlaceholder:function(e){e=e||this;var i,s=e.options;s.placeholder&&s.placeholder.constructor!==String||(i=s.placeholder,s.placeholder={element:function(){var s=e.currentItem[0].nodeName.toLowerCase(),n=t("<"+s+">",e.document[0]).addClass(i||e.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper");return"tr"===s?e.currentItem.children().each(function(){t("<td>&#160;</td>",e.document[0]).attr("colspan",t(this).attr("colspan")||1).appendTo(n)}):"img"===s&&n.attr("src",e.currentItem.attr("src")),i||n.css("visibility","hidden"),n},update:function(t,n){(!i||s.forcePlaceholderSize)&&(n.height()||n.height(e.currentItem.innerHeight()-parseInt(e.currentItem.css("paddingTop")||0,10)-parseInt(e.currentItem.css("paddingBottom")||0,10)),n.width()||n.width(e.currentItem.innerWidth()-parseInt(e.currentItem.css("paddingLeft")||0,10)-parseInt(e.currentItem.css("paddingRight")||0,10)))}}),e.placeholder=t(s.placeholder.element.call(e.element,e.currentItem)),e.currentItem.after(e.placeholder),s.placeholder.update(e,e.placeholder)},_contactContainers:function(s){var n,a,o,r,h,l,c,u,d,p,f=null,m=null;for(n=this.containers.length-1;n>=0;n--)if(!t.contains(this.currentItem[0],this.containers[n].element[0]))if(this._intersectsWith(this.containers[n].containerCache)){if(f&&t.contains(this.containers[n].element[0],f.element[0]))continue;f=this.containers[n],m=n}else this.containers[n].containerCache.over&&(this.containers[n]._trigger("out",s,this._uiHash(this)),this.containers[n].containerCache.over=0);if(f)if(1===this.containers.length)this.containers[m].containerCache.over||(this.containers[m]._trigger("over",s,this._uiHash(this)),this.containers[m].containerCache.over=1);else{for(o=1e4,r=null,p=f.floating||i(this.currentItem),h=p?"left":"top",l=p?"width":"height",c=this.positionAbs[h]+this.offset.click[h],a=this.items.length-1;a>=0;a--)t.contains(this.containers[m].element[0],this.items[a].item[0])&&this.items[a].item[0]!==this.currentItem[0]&&(!p||e(this.positionAbs.top+this.offset.click.top,this.items[a].top,this.items[a].height))&&(u=this.items[a].item.offset()[h],d=!1,Math.abs(u-c)>Math.abs(u+this.items[a][l]-c)&&(d=!0,u+=this.items[a][l]),o>Math.abs(u-c)&&(o=Math.abs(u-c),r=this.items[a],this.direction=d?"up":"down"));if(!r&&!this.options.dropOnEmpty)return;if(this.currentContainer===this.containers[m])return;r?this._rearrange(s,r,null,!0):this._rearrange(s,null,this.containers[m].element,!0),this._trigger("change",s,this._uiHash()),this.containers[m]._trigger("change",s,this._uiHash(this)),this.currentContainer=this.containers[m],this.options.placeholder.update(this.currentContainer,this.placeholder),this.containers[m]._trigger("over",s,this._uiHash(this)),this.containers[m].containerCache.over=1}},_createHelper:function(e){var i=this.options,s=t.isFunction(i.helper)?t(i.helper.apply(this.element[0],[e,this.currentItem])):"clone"===i.helper?this.currentItem.clone():this.currentItem;return s.parents("body").length||t("parent"!==i.appendTo?i.appendTo:this.currentItem[0].parentNode)[0].appendChild(s[0]),s[0]===this.currentItem[0]&&(this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}),(!s[0].style.width||i.forceHelperSize)&&s.width(this.currentItem.width()),(!s[0].style.height||i.forceHelperSize)&&s.height(this.currentItem.height()),s},_adjustOffsetFromHelper:function(e){"string"==typeof e&&(e=e.split(" ")),t.isArray(e)&&(e={left:+e[0],top:+e[1]||0}),"left"in e&&(this.offset.click.left=e.left+this.margins.left),"right"in e&&(this.offset.click.left=this.helperProportions.width-e.right+this.margins.left),"top"in e&&(this.offset.click.top=e.top+this.margins.top),"bottom"in e&&(this.offset.click.top=this.helperProportions.height-e.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var e=this.offsetParent.offset();return"absolute"===this.cssPosition&&this.scrollParent[0]!==document&&t.contains(this.scrollParent[0],this.offsetParent[0])&&(e.left+=this.scrollParent.scrollLeft(),e.top+=this.scrollParent.scrollTop()),(this.offsetParent[0]===document.body||this.offsetParent[0].tagName&&"html"===this.offsetParent[0].tagName.toLowerCase()&&t.ui.ie)&&(e={top:0,left:0}),{top:e.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:e.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"===this.cssPosition){var t=this.currentItem.position();return{top:t.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:t.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var e,i,s,n=this.options;"parent"===n.containment&&(n.containment=this.helper[0].parentNode),("document"===n.containment||"window"===n.containment)&&(this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,t("document"===n.containment?document:window).width()-this.helperProportions.width-this.margins.left,(t("document"===n.containment?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]),/^(document|window|parent)$/.test(n.containment)||(e=t(n.containment)[0],i=t(n.containment).offset(),s="hidden"!==t(e).css("overflow"),this.containment=[i.left+(parseInt(t(e).css("borderLeftWidth"),10)||0)+(parseInt(t(e).css("paddingLeft"),10)||0)-this.margins.left,i.top+(parseInt(t(e).css("borderTopWidth"),10)||0)+(parseInt(t(e).css("paddingTop"),10)||0)-this.margins.top,i.left+(s?Math.max(e.scrollWidth,e.offsetWidth):e.offsetWidth)-(parseInt(t(e).css("borderLeftWidth"),10)||0)-(parseInt(t(e).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,i.top+(s?Math.max(e.scrollHeight,e.offsetHeight):e.offsetHeight)-(parseInt(t(e).css("borderTopWidth"),10)||0)-(parseInt(t(e).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top])},_convertPositionTo:function(e,i){i||(i=this.position);var s="absolute"===e?1:-1,n="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&t.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,a=/(html|body)/i.test(n[0].tagName);return{top:i.top+this.offset.relative.top*s+this.offset.parent.top*s-("fixed"===this.cssPosition?-this.scrollParent.scrollTop():a?0:n.scrollTop())*s,left:i.left+this.offset.relative.left*s+this.offset.parent.left*s-("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():a?0:n.scrollLeft())*s}},_generatePosition:function(e){var i,s,n=this.options,a=e.pageX,o=e.pageY,r="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&t.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,h=/(html|body)/i.test(r[0].tagName);return"relative"!==this.cssPosition||this.scrollParent[0]!==document&&this.scrollParent[0]!==this.offsetParent[0]||(this.offset.relative=this._getRelativeOffset()),this.originalPosition&&(this.containment&&(e.pageX-this.offset.click.left<this.containment[0]&&(a=this.containment[0]+this.offset.click.left),e.pageY-this.offset.click.top<this.containment[1]&&(o=this.containment[1]+this.offset.click.top),e.pageX-this.offset.click.left>this.containment[2]&&(a=this.containment[2]+this.offset.click.left),e.pageY-this.offset.click.top>this.containment[3]&&(o=this.containment[3]+this.offset.click.top)),n.grid&&(i=this.originalPageY+Math.round((o-this.originalPageY)/n.grid[1])*n.grid[1],o=this.containment?i-this.offset.click.top>=this.containment[1]&&i-this.offset.click.top<=this.containment[3]?i:i-this.offset.click.top>=this.containment[1]?i-n.grid[1]:i+n.grid[1]:i,s=this.originalPageX+Math.round((a-this.originalPageX)/n.grid[0])*n.grid[0],a=this.containment?s-this.offset.click.left>=this.containment[0]&&s-this.offset.click.left<=this.containment[2]?s:s-this.offset.click.left>=this.containment[0]?s-n.grid[0]:s+n.grid[0]:s)),{top:o-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.scrollParent.scrollTop():h?0:r.scrollTop()),left:a-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():h?0:r.scrollLeft())}},_rearrange:function(t,e,i,s){i?i[0].appendChild(this.placeholder[0]):e.item[0].parentNode.insertBefore(this.placeholder[0],"down"===this.direction?e.item[0]:e.item[0].nextSibling),this.counter=this.counter?++this.counter:1;var n=this.counter;this._delay(function(){n===this.counter&&this.refreshPositions(!s)})},_clear:function(t,e){this.reverting=!1;var i,s=[];if(!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem),this._noFinalSort=null,this.helper[0]===this.currentItem[0]){for(i in this._storedCSS)("auto"===this._storedCSS[i]||"static"===this._storedCSS[i])&&(this._storedCSS[i]="");this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")}else this.currentItem.show();for(this.fromOutside&&!e&&s.push(function(t){this._trigger("receive",t,this._uiHash(this.fromOutside))}),!this.fromOutside&&this.domPosition.prev===this.currentItem.prev().not(".ui-sortable-helper")[0]&&this.domPosition.parent===this.currentItem.parent()[0]||e||s.push(function(t){this._trigger("update",t,this._uiHash())}),this!==this.currentContainer&&(e||(s.push(function(t){this._trigger("remove",t,this._uiHash())}),s.push(function(t){return function(e){t._trigger("receive",e,this._uiHash(this))}}.call(this,this.currentContainer)),s.push(function(t){return function(e){t._trigger("update",e,this._uiHash(this))}}.call(this,this.currentContainer)))),i=this.containers.length-1;i>=0;i--)e||s.push(function(t){return function(e){t._trigger("deactivate",e,this._uiHash(this))}}.call(this,this.containers[i])),this.containers[i].containerCache.over&&(s.push(function(t){return function(e){t._trigger("out",e,this._uiHash(this))}}.call(this,this.containers[i])),this.containers[i].containerCache.over=0);if(this.storedCursor&&(this.document.find("body").css("cursor",this.storedCursor),this.storedStylesheet.remove()),this._storedOpacity&&this.helper.css("opacity",this._storedOpacity),this._storedZIndex&&this.helper.css("zIndex","auto"===this._storedZIndex?"":this._storedZIndex),this.dragging=!1,this.cancelHelperRemoval){if(!e){for(this._trigger("beforeStop",t,this._uiHash()),i=0;s.length>i;i++)s[i].call(this,t);this._trigger("stop",t,this._uiHash())}return this.fromOutside=!1,!1}if(e||this._trigger("beforeStop",t,this._uiHash()),this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.helper[0]!==this.currentItem[0]&&this.helper.remove(),this.helper=null,!e){for(i=0;s.length>i;i++)s[i].call(this,t);this._trigger("stop",t,this._uiHash())}return this.fromOutside=!1,!0},_trigger:function(){t.Widget.prototype._trigger.apply(this,arguments)===!1&&this.cancel()},_uiHash:function(e){var i=e||this;return{helper:i.helper,placeholder:i.placeholder||t([]),position:i.position,originalPosition:i.originalPosition,offset:i.positionAbs,item:i.currentItem,sender:e?e.element:null}}})})(jQuery);

/* touch compat, http://stackoverflow.com/a/7143180 */
(function( $ ) {
    $.support.touch = Modernizr.touch;
    if (!$.support.touch) return;

    var proto =  $.ui.mouse.prototype,
    _mouseInit = proto._mouseInit;

    $.extend( proto, {
        _mouseInit: function() {
            this.element
            .bind( "touchstart." + this.widgetName, $.proxy( this, "_touchStart" ) );
            _mouseInit.apply( this, arguments );
        },
        _touchStart: function( event ) {
            if ( event.originalEvent.targetTouches.length != 1 ) return false;
            this.element
            .bind( "touchmove." + this.widgetName, $.proxy( this, "_touchMove" ) )
            .bind( "touchend." + this.widgetName, $.proxy( this, "_touchEnd" ) );
            this._modifyEvent( event );
            $( document ).trigger($.Event("mouseup"));
			this._mouseDown( event );
            return false;           
        },
        _touchMove: function( event ) {
			console.log("touchMove");
            this._modifyEvent( event );
            this._mouseMove( event );   
        },
        _touchEnd: function( event ) {
            this.element
            .unbind( "touchmove." + this.widgetName )
            .unbind( "touchend." + this.widgetName );
            this._mouseUp( event ); 
        },
        _modifyEvent: function( event ) {
            event.which = 1;
            var target = event.originalEvent.targetTouches[0];
            event.pageX = target.clientX;
            event.pageY = target.clientY;
        }
    });
})( jQuery );
;
haxe_Unserializer.DEFAULT_RESOLVER = Type;
haxe_Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe_ds_ObjectMap.count = 0;
haxe_io_FPHelper.i64tmp = (function($this) {
	var $r;
	var x = new haxe__$Int64__$_$_$Int64(0,0);
	$r = x;
	return $r;
}(this));
js_Boot.__toStr = {}.toString;
js_html_compat_Uint8Array.BYTES_PER_ELEMENT = 1;
tid_App.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);

export class Color {
    rgb: RGB;

    get hex(): string {
        return this.rgbToHex(this.rgb);
    }

    constructor(hex?: string) {
        if(hex && this.isColor(hex)) {
            let rgb = this.hexToRgb(hex);
            if(rgb) {
                this.rgb = rgb;
            } else {
                this.rgb = {r: 0, g: 0, b: 0};
            }
        } else {
            this.rgb = {r: 0, g: 0, b: 0};
        } 
    }

    isColor(color: any): boolean {
        if(color.r && color.g && color.b) return true;
        if(color.h && color.s && color.l) return true;
        if(typeof color == 'string' && color.match(/^#(?:[0-9a-fA-F]{3}){1,2}$/g)) return true;
        return false;
    }

    hslToRgb(hsl: HSL): RGB {
        let { h, s, l } = hsl;
        var r, g, b;
    
        if(s == 0){
            r = g = b = l; // achromatic
        }else{
            var hue2rgb = (p: number, q: number, t: number) => {
                if(t < 0) t += 1;
                if(t > 1) t -= 1;
                if(t < 1/6) return p + (q - p) * 6 * t;
                if(t < 1/2) return q;
                if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            }
    
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
    
        return {
            r: Math.round(r * 255), 
            g: Math.round(g * 255), 
            b: Math.round(b * 255)
        };
    }

    rgbToHsl(rgb: RGB): HSL {
        let { r, g, b } = rgb;
        r /= 255;
        g /= 255;
        b /= 255;
      
        let cmin = Math.min(r,g,b),
            cmax = Math.max(r,g,b),
            delta = cmax - cmin,
            h = 0,
            s = 0,
            l = 0;

        if (delta == 0) h = 0;
        else if (cmax == r)  h = ((g - b) / delta) % 6;
        else if (cmax == g) h = (b - r) / delta + 2;
        else h = (r - g) / delta + 4;
      
        h = Math.round(h * 60);
      
        if (h < 0) h += 360;
      
        l = (cmax + cmin) / 2;
      
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
      
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);
      
        return {
            h,
            s,
            l
        }
    }
    
    hexToRgb(hex: string): RGB | null {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if(result) {
            return {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            }
        } else {
            return null;
        }
    }

    rgbToHex(rgb: RGB): string {
        let { r, g, b } = rgb;
        let componentToHex = (c: number) => {
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }
}

export interface RGB {
    r: number;
    g: number;
    b: number;
}

export interface HSL {
    h: number;
    s: number;
    l: number;
}
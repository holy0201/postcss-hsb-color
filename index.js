var postcss = require('postcss');

function toHsl(hue, saturation, brightness) {
	var hsl = { hue: 0, saturation: 0, lightness: 0 };

	saturation = saturation * 0.01;
	brightness = brightness *  0.01;

	if (brightness !== 0) {
		hsl.hue = hue;
		hsl.lightness = 0.5 * brightness * (2 - saturation);
		hsl.saturation = (brightness * saturation) / (1 - Math.abs(2 * hsl.lightness - 1));
	} else {
		return [0, 0, 0];
	}

	return [hsl.hue, (hsl.saturation * 100).toFixed(0), (hsl.lightness * 100).toFixed(0)];
}

function toRgb(hue, saturation, brightness) {
	var r, g, b, max, min;

	saturation = saturation * 255 / 100;
	brightness = brightness * 255 / 100;

	hue = hue % 360;

	max = brightness;
	min = max - ((saturation / 255) * max);

	if (0 <= hue && hue < 60) {
		r = max;
		g = (hue / 60) * (max - min) + min;
		b = min;
	} else if (60 <= hue && hue < 120) {
		r = ((120 - hue) / 60) * (max - min) + min;
		g = max;
		b = min;
	} else if (120 <= hue && hue < 180) {
		r = min;
		g = max;
		b = ((hue - 120) / 60) * (max - min) + min;
	} else if (180 <= hue && hue < 240) {
		r = min;
		g = ((240 - hue) / 60) * (max - min) + min;
		b = max;
	} else if (240 <= hue && hue < 300) {
		r = ((hue - 240) / 60) * (max - min) + min;
		g = min;
		b = max;
	} else if (300 <= hue && hue < 360) {
		r = max;
		g = min;
		b = ((360 - hue) / 60) * (max - min) + min;
	}

	return [r.toFixed(0), g.toFixed(0), b.toFixed(0)];
}

module.exports = postcss.plugin('postcss-hsb-color', function (options) {
	options = options || {};
	var output = options.output;

	return function (css) {
		css.walkDecls(function (decl) {
			var hsb,
				type,
				resColor;

			if (decl.value.match(/hsba?\(.*\)$/g)) {
				hsb = postcss.list.comma(decl.value.replace(/[hsba?()]/g, ''));

				switch (output) {
					case 'rgb':
						resColor = toRgb(hsb[0], hsb[1], hsb[2]);
						type = 'rgb';
						break;
					case 'hsl':
					default:
						resColor = toHsl(hsb[0], hsb[1], hsb[2]);
						type = 'hsl';
						break;
				}
				
				if (hsb[3] && decl.value.indexOf('hsba') !== -1) {
					type += 'a';
					resColor.push(hsb[3]);
				}
				
				decl.cloneBefore({ value: type + '(' + resColor.join(', ') + ')' });

				decl.remove();
			}
		});
	};
});

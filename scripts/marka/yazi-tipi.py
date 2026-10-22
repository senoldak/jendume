# Instrument Sans'ı siteye ve kapaklara hazırlar: genişlik ekseni 100'e sabitlenir (yalnız ağırlık kalır), site için
# latin / latin-ext woff2 alt kümeleri (global.css'teki unicode-range'lerle aynı), kapaklar için TTF.
# Kaynak: Google Fonts deposundaki değişken TTF (OFL). Dosya değişirse woff2 sürüm ekini artır (/fonts/* önbellekte kalır).
# Kullanım (fontTools ve brotli gerekir): python scripts/marka/yazi-tipi.py <InstrumentSans[wdth,wght].ttf>
import sys
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools import subset

TTF = 'src/kapak/fontlar/InstrumentSans.ttf'
f = instantiateVariableFont(TTFont(sys.argv[1]), {'wdth': 100})
f.save(TTF)

ARALIK = {
    'latin': 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD',
    'latin-ext': 'U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF',
}
for ad, aralik in ARALIK.items():
    o = subset.Options()
    o.flavor = 'woff2'
    o.layout_features = ['*']
    o.name_IDs = ['*']
    o.notdef_outline = True
    s = subset.Subsetter(o)
    s.populate(unicodes=subset.parse_unicodes(aralik))
    font = TTFont(TTF)
    s.subset(font)
    subset.save_font(font, f'public/fonts/instrument-{ad}-v1.woff2', o)
print('tamam')

/*!
	Copyright (c) 2011-2015, Pavel Shramov, Bruno Bergot - MIT licence
*/

L.KML = L.FeatureGroup.extend({
  initialize(kml, kmlOptions) {
    this._kml = kml
    this._layers = {}
    this._kmlOptions = kmlOptions

    if (kml) {
      this.addKML(kml, kmlOptions)
    }
  },

  addKML(xml, kmlOptions) {
    const layers = L.KML.parseKML(xml, kmlOptions)
    if (!layers || !layers.length) return
    for (let i = 0; i < layers.length; i++) {
      this.fire('addlayer', {
        layer: layers[i]
      })
      this.addLayer(layers[i])
    }
    this.latLngs = L.KML.getLatLngs(xml)
    this.fire('loaded')
  },

  latLngs: []
})

L.Util.extend(L.KML, {
  parseKML(xml, kmlOptions) {
    const style = this.parseStyles(xml, kmlOptions)
    this.parseStyleMap(xml, style)
    let el = xml.getElementsByTagName('Folder')
    const layers = []
    let l
    for (let i = 0; i < el.length; i++) {
      if (!this._check_folder(el[i])) {
        continue
      }
      l = this.parseFolder(el[i], style)
      if (l) {
        layers.push(l)
      }
    }
    el = xml.getElementsByTagName('Placemark')
    for (let j = 0; j < el.length; j++) {
      if (!this._check_folder(el[j])) {
        continue
      }
      l = this.parsePlacemark(el[j], xml, style)
      if (l) {
        layers.push(l)
      }
    }
    el = xml.getElementsByTagName('GroundOverlay')
    for (let k = 0; k < el.length; k++) {
      l = this.parseGroundOverlay(el[k])
      if (l) {
        layers.push(l)
      }
    }
    return layers
  },

  // Return false if e's first parent Folder is not [folder]
  // - returns true if no parent Folders
  _check_folder(e, folder) {
    e = e.parentNode
    while (e && e.tagName !== 'Folder') {
      e = e.parentNode
    }
    return !e || e === folder
  },

  parseStyles(xml, kmlOptions) {
    const styles = {}
    const sl = xml.getElementsByTagName('Style')
    for (let i = 0, len = sl.length; i < len; i++) {
      const style = this.parseStyle(sl[i], kmlOptions)
      if (style) {
        const styleName = `#${style.id}`
        styles[styleName] = style
      }
    }
    return styles
  },

  parseStyle(xml, kmlOptions) {
    let style = {}
    let poptions = {}
    let ioptions = {}
    let el
    let id

    const attributes = { color: true, width: true, Icon: true, href: true, hotSpot: true }

    function _parse(xml) {
      const options = {}
      for (let i = 0; i < xml.childNodes.length; i++) {
        const e = xml.childNodes[i]
        const key = e.tagName
        if (!attributes[key]) {
          continue
        }
        if (key === 'hotSpot') {
          for (let j = 0; j < e.attributes.length; j++) {
            options[e.attributes[j].name] = e.attributes[j].nodeValue
          }
        } else {
          const value = e.childNodes[0].nodeValue
          if (key === 'color') {
            options.opacity = parseInt(value.substring(0, 2), 16) / 255.0
            options.color = `#${value.substring(6, 8)}${value.substring(4, 6)}${value.substring(
              2,
              4
            )}`
          } else if (key === 'width') {
            options.weight = parseInt(value)
          } else if (key === 'Icon') {
            ioptions = _parse(e)
            if (ioptions.href) {
              options.href = ioptions.href
            }
          } else if (key === 'href') {
            options.href = value
          }
        }
      }
      return options
    }

    el = xml.getElementsByTagName('LineStyle')
    if (el && el[0]) {
      style = _parse(el[0])
    }
    el = xml.getElementsByTagName('PolyStyle')
    if (el && el[0]) {
      poptions = _parse(el[0])
    }
    if (poptions.color) {
      style.fillColor = poptions.color
    }
    if (poptions.opacity) {
      style.fillOpacity = poptions.opacity
    }
    el = xml.getElementsByTagName('IconStyle')
    if (el && el[0]) {
      ioptions = _parse(el[0])
    }
    if (ioptions.href) {
      const iconOptions = {
        iconUrl: ioptions.href,
        shadowUrl: null,
        anchorRef: { x: ioptions.x, y: ioptions.y },
        anchorType: { x: ioptions.xunits, y: ioptions.yunits }
      }

      if (typeof kmlOptions === 'object' && typeof kmlOptions.iconOptions === 'object') {
        L.Util.extend(iconOptions, kmlOptions.iconOptions)
      }

      style.icon = new L.KMLIcon(iconOptions)
    }

    id = xml.getAttribute('id')
    if (id && style) {
      style.id = id
    }

    return style
  },

  parseStyleMap(xml, existingStyles) {
    const sl = xml.getElementsByTagName('StyleMap')

    for (let i = 0; i < sl.length; i++) {
      const e = sl[i]
      var el
      var smKey
      var smStyleUrl

      el = e.getElementsByTagName('key')
      if (el && el[0]) {
        smKey = el[0].textContent
      }
      el = e.getElementsByTagName('styleUrl')
      if (el && el[0]) {
        smStyleUrl = el[0].textContent
      }

      if (smKey === 'normal') {
        existingStyles[`#${e.getAttribute('id')}`] = existingStyles[smStyleUrl]
      }
    }
  },

  parseFolder(xml, style) {
    let el
    const layers = []
    let l
    el = xml.getElementsByTagName('Folder')
    for (let i = 0; i < el.length; i++) {
      if (!this._check_folder(el[i], xml)) {
        continue
      }
      l = this.parseFolder(el[i], style)
      if (l) {
        layers.push(l)
      }
    }
    el = xml.getElementsByTagName('Placemark')
    for (let j = 0; j < el.length; j++) {
      if (!this._check_folder(el[j], xml)) {
        continue
      }
      l = this.parsePlacemark(el[j], xml, style)
      if (l) {
        layers.push(l)
      }
    }
    el = xml.getElementsByTagName('GroundOverlay')
    for (let k = 0; k < el.length; k++) {
      if (!this._check_folder(el[k], xml)) {
        continue
      }
      l = this.parseGroundOverlay(el[k])
      if (l) {
        layers.push(l)
      }
    }
    if (!layers.length) {
      return
    }
    if (layers.length === 1) {
      l = layers[0]
    } else {
      l = new L.FeatureGroup(layers)
    }
    el = xml.getElementsByTagName('name')
    if (el.length && el[0].childNodes.length) {
      l.options.name = el[0].childNodes[0].nodeValue
    }
    return l
  },

  parsePlacemark(place, xml, style, options) {
    let h
    let i
    let j
    let k
    let el
    let il
    const opts = options || {}

    el = place.getElementsByTagName('styleUrl')
    for (i = 0; i < el.length; i++) {
      const url = el[i].childNodes[0].nodeValue
      for (const a in style[url]) {
        opts[a] = style[url][a]
      }
    }

    il = place.getElementsByTagName('Style')[0]
    if (il) {
      const inlineStyle = this.parseStyle(place)
      if (inlineStyle) {
        for (k in inlineStyle) {
          opts[k] = inlineStyle[k]
        }
      }
    }

    const multi = ['MultiGeometry', 'MultiTrack', 'gx:MultiTrack']
    for (h in multi) {
      el = place.getElementsByTagName(multi[h])
      for (i = 0; i < el.length; i++) {
        var layer = this.parsePlacemark(el[i], xml, style, opts)
        if (layer === undefined) continue
        this.addPlacePopup(place, layer)
        return layer
      }
    }

    const layers = []

    const parse = ['LineString', 'Polygon', 'Point', 'Track', 'gx:Track']
    for (j in parse) {
      const tag = parse[j]
      el = place.getElementsByTagName(tag)
      for (i = 0; i < el.length; i++) {
        const l = this[`parse${tag.replace(/gx:/, '')}`](el[i], xml, opts)
        if (l) {
          layers.push(l)
        }
      }
    }

    if (!layers.length) {
      return
    }
    var layer = layers[0]
    if (layers.length > 1) {
      layer = new L.FeatureGroup(layers)
    }

    this.addPlacePopup(place, layer)
    return layer
  },

  addPlacePopup(place, layer) {
    let el
    let i
    let j
    let name
    let descr = ''
    el = place.getElementsByTagName('name')
    if (el.length && el[0].childNodes.length) {
      name = el[0].childNodes[0].nodeValue
    }
    el = place.getElementsByTagName('description')
    for (i = 0; i < el.length; i++) {
      for (j = 0; j < el[i].childNodes.length; j++) {
        descr += el[i].childNodes[j].nodeValue
      }
    }

    if (name) {
      layer.bindPopup(`<h2>${name}</h2>${descr}`, { className: 'kml-popup' })
    }
  },

  parseCoords(xml) {
    const el = xml.getElementsByTagName('coordinates')
    return this._read_coords(el[0])
  },

  parseLineString(line, xml, options) {
    const coords = this.parseCoords(line)
    if (!coords.length) {
      return
    }
    return new L.Polyline(coords, options)
  },

  parseTrack(line, xml, options) {
    let el = xml.getElementsByTagName('gx:coord')
    if (el.length === 0) {
      el = xml.getElementsByTagName('coord')
    }
    let coords = []
    for (let j = 0; j < el.length; j++) {
      coords = coords.concat(this._read_gxcoords(el[j]))
    }
    if (!coords.length) {
      return
    }
    return new L.Polyline(coords, options)
  },

  parsePoint(line, xml, options) {
    const el = line.getElementsByTagName('coordinates')
    if (!el.length) {
      return
    }
    const ll = el[0].childNodes[0].nodeValue.split(',')
    return new L.KMLMarker(new L.LatLng(ll[1], ll[0]), options)
  },

  parsePolygon(line, xml, options) {
    let el
    const polys = []
    const inner = []
    let i
    let coords
    el = line.getElementsByTagName('outerBoundaryIs')
    for (i = 0; i < el.length; i++) {
      coords = this.parseCoords(el[i])
      if (coords) {
        polys.push(coords)
      }
    }
    el = line.getElementsByTagName('innerBoundaryIs')
    for (i = 0; i < el.length; i++) {
      coords = this.parseCoords(el[i])
      if (coords) {
        inner.push(coords)
      }
    }
    if (!polys.length) {
      return
    }
    if (options.fillColor) {
      options.fill = true
    }
    if (polys.length === 1) {
      return new L.Polygon(polys.concat(inner), options)
    }
    return new L.MultiPolygon(polys, options)
  },

  getLatLngs(xml) {
    const el = xml.getElementsByTagName('coordinates')
    let coords = []
    for (let j = 0; j < el.length; j++) {
      // text might span many childNodes
      coords = coords.concat(this._read_coords(el[j]))
    }
    return coords
  },

  _read_coords(el) {
    let text = ''
    const coords = []
    let i
    for (i = 0; i < el.childNodes.length; i++) {
      text += el.childNodes[i].nodeValue
    }
    text = text.split(/[\s\n]+/)
    for (i = 0; i < text.length; i++) {
      const ll = text[i].split(',')
      if (ll.length < 2) {
        continue
      }
      coords.push(new L.LatLng(ll[1], ll[0]))
    }
    return coords
  },

  _read_gxcoords(el) {
    let text = ''
    const coords = []
    text = el.firstChild.nodeValue.split(' ')
    coords.push(new L.LatLng(text[1], text[0]))
    return coords
  },

  parseGroundOverlay(xml) {
    const latlonbox = xml.getElementsByTagName('LatLonBox')[0]
    const bounds = new L.LatLngBounds(
      [
        latlonbox.getElementsByTagName('south')[0].childNodes[0].nodeValue,
        latlonbox.getElementsByTagName('west')[0].childNodes[0].nodeValue
      ],
      [
        latlonbox.getElementsByTagName('north')[0].childNodes[0].nodeValue,
        latlonbox.getElementsByTagName('east')[0].childNodes[0].nodeValue
      ]
    )
    const attributes = { Icon: true, href: true, color: true }
    function _parse(xml) {
      const options = {}
      let ioptions = {}
      for (let i = 0; i < xml.childNodes.length; i++) {
        const e = xml.childNodes[i]
        const key = e.tagName
        if (!attributes[key]) {
          continue
        }
        const value = e.childNodes[0].nodeValue
        if (key === 'Icon') {
          ioptions = _parse(e)
          if (ioptions.href) {
            options.href = ioptions.href
          }
        } else if (key === 'href') {
          options.href = value
        } else if (key === 'color') {
          options.opacity = parseInt(value.substring(0, 2), 16) / 255.0
          options.color = `#${value.substring(6, 8)}${value.substring(4, 6)}${value.substring(
            2,
            4
          )}`
        }
      }
      return options
    }
    let options = {}
    options = _parse(xml)
    if (latlonbox.getElementsByTagName('rotation')[0] !== undefined) {
      const rotation = latlonbox.getElementsByTagName('rotation')[0].childNodes[0].nodeValue
      options.rotation = parseFloat(rotation)
    }
    return new L.RotatedImageOverlay(options.href, bounds, {
      opacity: options.opacity,
      angle: options.rotation
    })
  }
})

L.KMLIcon = L.Icon.extend({
  options: {
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  },
  _setIconStyles(img, name) {
    L.Icon.prototype._setIconStyles.apply(this, [img, name])
  },
  _createImg(src, el) {
    el = el || document.createElement('img')
    el.onload = this.applyCustomStyles.bind(this, el)
    el.src = src
    return el
  },
  applyCustomStyles(img) {
    const { options } = this
    const width = options.iconSize[0]
    const height = options.iconSize[1]

    this.options.popupAnchor = [0, -0.83 * height]
    if (options.anchorType.x === 'fraction')
      img.style.marginLeft = `${-options.anchorRef.x * width}px`
    if (options.anchorType.y === 'fraction')
      img.style.marginTop = `${-(1 - options.anchorRef.y) * height + 1}px`
    if (options.anchorType.x === 'pixels') img.style.marginLeft = `${-options.anchorRef.x}px`
    if (options.anchorType.y === 'pixels')
      img.style.marginTop = `${options.anchorRef.y - height + 1}px`
  }
})

L.KMLMarker = L.Marker.extend({
  options: {
    icon: new L.KMLIcon.Default()
  }
})

// Inspired by https://github.com/bbecquet/Leaflet.PolylineDecorator/tree/master/src
L.RotatedImageOverlay = L.ImageOverlay.extend({
  options: {
    angle: 0
  },
  _reset() {
    L.ImageOverlay.prototype._reset.call(this)
    this._rotate()
  },
  _animateZoom(e) {
    L.ImageOverlay.prototype._animateZoom.call(this, e)
    this._rotate()
  },
  _rotate() {
    if (L.DomUtil.TRANSFORM) {
      // use the CSS transform rule if available
      this._image.style[L.DomUtil.TRANSFORM] += ` rotate(${this.options.angle}deg)`
    } else if (L.Browser.ie) {
      // fallback for IE6, IE7, IE8
      const rad = this.options.angle * (Math.PI / 180)
      const costheta = Math.cos(rad)
      const sintheta = Math.sin(rad)
      this._image.style.filter += ` progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand', M11=${costheta}, M12=${-sintheta}, M21=${sintheta}, M22=${costheta})`
    }
  },
  getBounds() {
    return this._bounds
  }
})

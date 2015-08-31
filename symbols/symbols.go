package main

import (
	"flag"
	"fmt"
	"image"
	"image/png"
	"log"
	"math"
	"net/http"
	"net/url"
	"strconv"

	"github.com/ungerik/go-cairo"
)

// Port

var Port int

func init() {
	flag.IntVar(&Port, "p", 5555, "port to listen on")
}

// Symbol

type Symbol int

const (
	Circle Symbol = iota
	Square
	Triangle
	X
	Plus
	Diamond
	Marker
)

var Symbols map[string]Symbol

func init() {
	Symbols = make(map[string]Symbol)
	Symbols["circle"] = Circle
	Symbols["square"] = Square
	Symbols["triangle"] = Triangle
	Symbols["x"] = X
	Symbols["plus"] = Plus
	Symbols["diamond"] = Diamond
	Symbols["marker"] = Marker
}

// Color

type Color struct {
	R, G, B, A float64
}

func (a Color) Set(dc *cairo.Surface) {
	dc.SetSourceRGBA(a.R, a.G, a.B, a.A)
}

func ParseColor(x string) Color {
	rr, _ := strconv.ParseInt(x[0:2], 16, 0)
	gg, _ := strconv.ParseInt(x[2:4], 16, 0)
	bb, _ := strconv.ParseInt(x[4:6], 16, 0)
	r := float64(rr) / 255
	g := float64(gg) / 255
	b := float64(bb) / 255
	return Color{r, g, b, 1}
}

// Options

type Options struct {
	Symbol       Symbol
	Size         float64
	StrokeWeight float64
	StrokeColor  Color
	FillColor    Color
}

func ParseOptions(values url.Values) Options {
	opt := Options{}
	opt.Symbol = Circle
	opt.Size = 8
	opt.StrokeWeight = 1
	opt.StrokeColor = Color{0, 0, 0, 1}
	opt.FillColor = Color{1, 0, 0, 1}
	if len(values["symbol"]) > 0 {
		opt.Symbol = Symbols[values["symbol"][0]]
	}
	if len(values["size"]) > 0 {
		opt.Size, _ = strconv.ParseFloat(values["size"][0], 64)
	}
	if len(values["strokeWeight"]) > 0 {
		opt.StrokeWeight, _ = strconv.ParseFloat(values["strokeWeight"][0], 64)
	}
	if len(values["strokeColor"]) > 0 {
		opt.StrokeColor = ParseColor(values["strokeColor"][0])
	}
	if len(values["strokeOpacity"]) > 0 {
		a, _ := strconv.ParseFloat(values["strokeOpacity"][0], 64)
		opt.StrokeColor.A = a
	}
	if len(values["fillColor"]) > 0 {
		opt.FillColor = ParseColor(values["fillColor"][0])
	}
	if len(values["fillOpacity"]) > 0 {
		a, _ := strconv.ParseFloat(values["fillOpacity"][0], 64)
		opt.FillColor.A = a
	}
	return opt
}

func Render(options Options) image.Image {
	size := options.Size * 2
	dc := cairo.NewSurface(cairo.FORMAT_ARGB32, int(size), int(size))
	dc.SetFillRule(cairo.FILL_RULE_EVEN_ODD)
	dc.Translate(size/2, size/2)
	n := options.Size / 2
	switch options.Symbol {
	case Circle:
		dc.Arc(0, 0, n, 0, 2*math.Pi)
	case Square:
		dc.MoveTo(-n, -n)
		dc.LineTo(n, -n)
		dc.LineTo(n, n)
		dc.LineTo(-n, n)
		dc.ClosePath()
	case Triangle:
		for a := 0; a < 360; a += 120 {
			r := float64(a-90) * math.Pi / 180
			x := math.Cos(r) * n
			y := math.Sin(r) * n
			dc.LineTo(x, y)
		}
		dc.ClosePath()
	case X:
		dc.MoveTo(-n, -n)
		dc.LineTo(n, n)
		dc.MoveTo(n, -n)
		dc.LineTo(-n, n)
	case Plus:
		dc.MoveTo(0, -n)
		dc.LineTo(0, n)
		dc.MoveTo(-n, 0)
		dc.LineTo(n, 0)
	case Diamond:
		dc.MoveTo(-n/math.Sqrt2, 0)
		dc.LineTo(0, -n)
		dc.LineTo(n/math.Sqrt2, 0)
		dc.LineTo(0, n)
		dc.ClosePath()
	case Marker:
		dc.Arc(0, 0, n, math.Pi, 0)
		dc.Arc(-n, 0, n*2, 0, 1.045)
		dc.Arc(n, 0, n*2, math.Pi-1.045, math.Pi)
		dc.NewSubPath()
		dc.Arc(0, 0, n/2.5, 0, 2*math.Pi)
	}
	options.FillColor.Set(dc)
	dc.FillPreserve()
	dc.SetLineWidth(options.StrokeWeight)
	options.StrokeColor.Set(dc)
	dc.Stroke()
	return dc.GetImage()
}

func Handler(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	options := ParseOptions(r.Form)
	if options.Size < 1 || options.Size > 100 {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	if options.StrokeWeight < 1 || options.StrokeWeight > 100 {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	im := Render(options)
	w.Header().Set("Content-Type", "image/png")
	png.Encode(w, im)
}

func main() {
	flag.Parse()
	http.HandleFunc("/", Handler)
	addr := fmt.Sprintf(":%d", Port)
	log.Fatal(http.ListenAndServe(addr, nil))
}

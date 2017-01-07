# postcss-hsb-color [![Build Status](https://travis-ci.org/holy0201/postcss-hsb-color.svg?branch=master)](https://travis-ci.org/holy0201/postcss-hsb-color)

Postcss plugin adding hsb() color.

## Installation

`yarn add postcss-hsb-color`

## Usage

Input:

```
body {
    color: hsb(252, 35%, 64%);
}
```

Output:

```
body {
    color: hsl(252, 24%, 53%);
}
```

## Option

`postcss( [ hsbcolor({ output: 'rgb' }) ] )`

output: 'rgb', 'hsl'(default)
# postcss-hsb-color [![Build Status](https://travis-ci.org/holy0201/postcss-hsb-color.svg?branch=master)](https://travis-ci.org/holy0201/postcss-hsb-color)

Postcss plugin adding hsb() color.

## Installation

`yarn add postcss-hsb-color`

## Usage

Input:

```
body {
    color: hsb(100, 20%, 50%);
}
```

Output:

```
body {
    color: hsl(100, 20%, 50%);
}
```

## Option

`postcss( [ hsbcolor({ output: 'rgb' }) ] )`

output: 'rgb', 'hsl'(default)
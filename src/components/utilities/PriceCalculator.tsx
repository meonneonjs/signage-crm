'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MATERIAL_COSTS = {
  acrylic: 45,
  aluminum: 35,
  vinyl: 25,
  led: 55,
  pvc: 30,
};

const COMPLEXITY_MULTIPLIERS = {
  simple: 1,
  medium: 1.5,
  complex: 2,
};

export function PriceCalculator() {
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [material, setMaterial] = useState('vinyl');
  const [complexity, setComplexity] = useState('simple');
  const [quantity, setQuantity] = useState('1');
  const [totalPrice, setTotalPrice] = useState(0);
  const [pricePerUnit, setPricePerUnit] = useState(0);

  const calculatePrice = () => {
    const w = parseFloat(width);
    const h = parseFloat(height);
    const qty = parseInt(quantity);

    if (isNaN(w) || isNaN(h) || isNaN(qty)) {
      setTotalPrice(0);
      setPricePerUnit(0);
      return;
    }

    const area = w * h;
    const basePrice = area * MATERIAL_COSTS[material];
    const multiplier = COMPLEXITY_MULTIPLIERS[complexity];
    const unitPrice = basePrice * multiplier;
    const total = unitPrice * qty;

    setPricePerUnit(Math.round(unitPrice * 100) / 100);
    setTotalPrice(Math.round(total * 100) / 100);
  };

  useEffect(() => {
    calculatePrice();
  }, [width, height, material, complexity, quantity]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Width (ft)</Label>
          <Input
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            placeholder="Enter width"
            min="0"
            step="0.1"
          />
        </div>
        <div className="space-y-2">
          <Label>Height (ft)</Label>
          <Input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter height"
            min="0"
            step="0.1"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Material</Label>
        <Select value={material} onValueChange={setMaterial}>
          <SelectTrigger>
            <SelectValue placeholder="Select material" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="vinyl">Vinyl</SelectItem>
            <SelectItem value="acrylic">Acrylic</SelectItem>
            <SelectItem value="aluminum">Aluminum</SelectItem>
            <SelectItem value="led">LED</SelectItem>
            <SelectItem value="pvc">PVC</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Design Complexity</Label>
        <Select value={complexity} onValueChange={setComplexity}>
          <SelectTrigger>
            <SelectValue placeholder="Select complexity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="simple">Simple</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="complex">Complex</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Quantity</Label>
        <Input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Enter quantity"
          min="1"
          step="1"
        />
      </div>

      <Card className="p-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Price per unit:</span>
            <span className="font-medium">${pricePerUnit}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total price:</span>
            <span className="font-medium">${totalPrice}</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            * This is an estimate and may vary based on specific design requirements
          </p>
        </div>
      </Card>
    </div>
  );
} 
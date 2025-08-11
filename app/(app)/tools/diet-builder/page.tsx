/**
 * @fileoverview Anti-Inflammatory Diet Builder - Create personalized 7-day meal plans 
 * that eliminate mycotoxins and support detoxification
 */

'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { 
  Utensils,
  ShoppingCart,
  Clock,
  CheckCircle,
  X,
  Plus,
  Download,
  Leaf,
  AlertTriangle,
  Heart,
  Zap
} from 'lucide-react'

interface FoodItem {
  id: string
  name: string
  category: 'protein' | 'vegetable' | 'fruit' | 'grain' | 'fat' | 'herb-spice'
  moldRisk: 'low' | 'medium' | 'high'
  inflammatory: boolean
  nutrients: string[]
  prepTime: number // minutes
  cost: 'low' | 'medium' | 'high'
}

interface Meal {
  id: string
  name: string
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  ingredients: string[]
  prepTime: number
  cookTime: number
  servings: number
  instructions: string[]
  nutrition: {
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber: number
  }
  antiInflammatory: boolean
  detoxSupporting: boolean
}

interface DietPreferences {
  restrictions: string[]
  allergies: string[]
  dislikes: string[]
  cookingSkill: 'beginner' | 'intermediate' | 'advanced'
  timeAvailable: 'minimal' | 'moderate' | 'plenty'
  budget: 'tight' | 'moderate' | 'flexible'
  phase: 'elimination' | 'reintroduction' | 'maintenance'
}

const lowMoldFoods: FoodItem[] = [
  {
    id: 'wild-salmon',
    name: 'Wild Salmon',
    category: 'protein',
    moldRisk: 'low',
    inflammatory: false,
    nutrients: ['Omega-3', 'Protein', 'Vitamin D'],
    prepTime: 15,
    cost: 'high'
  },
  {
    id: 'grass-fed-beef',
    name: 'Grass-Fed Beef',
    category: 'protein',
    moldRisk: 'low',
    inflammatory: false,
    nutrients: ['Protein', 'B12', 'Iron', 'Zinc'],
    prepTime: 20,
    cost: 'high'
  },
  {
    id: 'pastured-eggs',
    name: 'Pastured Eggs',
    category: 'protein',
    moldRisk: 'low',
    inflammatory: false,
    nutrients: ['Protein', 'Choline', 'Vitamin D'],
    prepTime: 5,
    cost: 'medium'
  },
  {
    id: 'broccoli',
    name: 'Broccoli',
    category: 'vegetable',
    moldRisk: 'low',
    inflammatory: false,
    nutrients: ['Vitamin C', 'Folate', 'Sulforaphane'],
    prepTime: 10,
    cost: 'low'
  },
  {
    id: 'kale',
    name: 'Kale',
    category: 'vegetable',
    moldRisk: 'low',
    inflammatory: false,
    nutrients: ['Vitamin K', 'Vitamin C', 'Antioxidants'],
    prepTime: 5,
    cost: 'low'
  },
  {
    id: 'blueberries',
    name: 'Organic Blueberries',
    category: 'fruit',
    moldRisk: 'low',
    inflammatory: false,
    nutrients: ['Antioxidants', 'Vitamin C', 'Anthocyanins'],
    prepTime: 0,
    cost: 'medium'
  },
  {
    id: 'avocado',
    name: 'Avocado',
    category: 'fat',
    moldRisk: 'low',
    inflammatory: false,
    nutrients: ['Monounsaturated Fat', 'Fiber', 'Potassium'],
    prepTime: 2,
    cost: 'medium'
  },
  {
    id: 'coconut-oil',
    name: 'Coconut Oil',
    category: 'fat',
    moldRisk: 'low',
    inflammatory: false,
    nutrients: ['MCTs', 'Lauric Acid'],
    prepTime: 0,
    cost: 'medium'
  },
  {
    id: 'turmeric',
    name: 'Turmeric',
    category: 'herb-spice',
    moldRisk: 'low',
    inflammatory: false,
    nutrients: ['Curcumin', 'Anti-inflammatory compounds'],
    prepTime: 0,
    cost: 'low'
  },
  {
    id: 'ginger',
    name: 'Fresh Ginger',
    category: 'herb-spice',
    moldRisk: 'low',
    inflammatory: false,
    nutrients: ['Gingerol', 'Anti-inflammatory compounds'],
    prepTime: 2,
    cost: 'low'
  }
]

const highRiskFoods = [
  'Peanuts', 'Tree nuts (stored)', 'Dried fruits', 'Coffee', 'Wine', 'Beer',
  'Cheese (aged)', 'Mushrooms', 'Soy sauce', 'Vinegar', 'Pickled foods',
  'Processed meats', 'Canned foods', 'Leftover grains'
]

const sampleMeals: Meal[] = [
  {
    id: 'anti-inflammatory-smoothie',
    name: 'Anti-Inflammatory Green Smoothie',
    type: 'breakfast',
    ingredients: ['Kale', 'Blueberries', 'Avocado', 'Coconut milk', 'Ginger', 'Turmeric'],
    prepTime: 5,
    cookTime: 0,
    servings: 1,
    instructions: [
      'Add 1 cup coconut milk to blender',
      'Add 1 cup kale, 1/2 avocado, 1/2 cup blueberries',
      'Add 1 tsp fresh ginger, 1/2 tsp turmeric',
      'Blend until smooth, add ice if desired'
    ],
    nutrition: { calories: 320, protein: 8, carbs: 25, fat: 22, fiber: 12 },
    antiInflammatory: true,
    detoxSupporting: true
  },
  {
    id: 'salmon-broccoli-bowl',
    name: 'Wild Salmon & Broccoli Bowl',
    type: 'lunch',
    ingredients: ['Wild salmon', 'Broccoli', 'Avocado', 'Coconut oil', 'Lemon', 'Herbs'],
    prepTime: 10,
    cookTime: 15,
    servings: 1,
    instructions: [
      'Season 6oz salmon with herbs and lemon',
      'Pan-sear in coconut oil for 4-5 min per side',
      'Steam broccoli for 5-7 minutes',
      'Serve over broccoli with sliced avocado',
      'Drizzle with lemon and extra coconut oil'
    ],
    nutrition: { calories: 485, protein: 42, carbs: 12, fat: 30, fiber: 8 },
    antiInflammatory: true,
    detoxSupporting: true
  }
]

export default function DietBuilderPage() {
  const [preferences, setPreferences] = useState<DietPreferences>({
    restrictions: [],
    allergies: [],
    dislikes: [],
    cookingSkill: 'beginner',
    timeAvailable: 'moderate',
    budget: 'moderate',
    phase: 'elimination'
  })
  const [selectedFoods, setSelectedFoods] = useState<string[]>([])
  const [mealPlan, setMealPlan] = useState<Meal[]>([])
  const [shoppingList, setShoppingList] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    'Preferences',
    'Food Selection', 
    'Meal Planning',
    'Shopping List'
  ]

  const generateMealPlan = () => {
    // Simple meal plan generation based on preferences
    const filteredMeals = sampleMeals.filter(meal => {
      // Filter based on time available
      if (preferences.timeAvailable === 'minimal' && meal.prepTime + meal.cookTime > 20) return false
      if (preferences.timeAvailable === 'moderate' && meal.prepTime + meal.cookTime > 45) return false
      
      // Filter based on restrictions
      const mealIngredients = meal.ingredients.map(i => i.toLowerCase())
      if (preferences.restrictions.some(restriction => 
        mealIngredients.some(ingredient => ingredient.includes(restriction.toLowerCase()))
      )) return false
      
      return true
    })

    // Generate 7-day plan (simplified)
    const weekPlan: Meal[] = []
    const mealsNeeded = 7 * 3 // 7 days × 3 meals

    for (let i = 0; i < mealsNeeded; i++) {
      const mealType = i % 3 === 0 ? 'breakfast' : i % 3 === 1 ? 'lunch' : 'dinner'
      const availableMeals = filteredMeals.filter(meal => meal.type === mealType)
      if (availableMeals.length > 0) {
        weekPlan.push(availableMeals[i % availableMeals.length])
      }
    }

    setMealPlan(weekPlan)
    generateShoppingList(weekPlan)
  }

  const generateShoppingList = (meals: Meal[]) => {
    const ingredients = new Set<string>()
    meals.forEach(meal => {
      meal.ingredients.forEach(ingredient => ingredients.add(ingredient))
    })
    setShoppingList(Array.from(ingredients).sort())
  }

  const updatePreference = (key: keyof DietPreferences, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }))
  }

  const toggleArrayItem = (array: string[], item: string, setArray: (items: string[]) => void) => {
    if (array.includes(item)) {
      setArray(array.filter(i => i !== item))
    } else {
      setArray([...array, item])
    }
  }

  const exportMealPlan = () => {
    const exportData = {
      preferences,
      mealPlan,
      shoppingList,
      generatedAt: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'anti-inflammatory-meal-plan.json'
    a.click()
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Anti-Inflammatory Diet Builder</h1>
        <p className="text-gray-600 mb-6">
          Create personalized meal plans that eliminate mycotoxins and support your mold detox journey.
        </p>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                index <= currentStep 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {index + 1}
              </div>
              <span className={`ml-2 text-sm ${
                index <= currentStep ? 'text-primary-600 font-medium' : 'text-gray-500'
              }`}>
                {step}
              </span>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-4 ${
                  index < currentStep ? 'bg-primary-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <Tabs value={steps[currentStep].toLowerCase().replace(' ', '-')} className="space-y-6">
        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tell Us About Your Needs</CardTitle>
              <CardDescription>
                We'll customize your meal plan based on your preferences and restrictions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Detox Phase */}
              <div>
                <Label className="text-base font-medium">What phase are you in?</Label>
                <Select value={preferences.phase} onValueChange={(value: any) => updatePreference('phase', value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="elimination">Elimination (Strict avoidance)</SelectItem>
                    <SelectItem value="reintroduction">Reintroduction (Testing foods)</SelectItem>
                    <SelectItem value="maintenance">Maintenance (Long-term healthy)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Dietary Restrictions */}
              <div>
                <Label className="text-base font-medium">Dietary Restrictions</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                  {['Dairy-free', 'Gluten-free', 'Nut-free', 'Egg-free', 'Vegetarian', 'Vegan'].map(restriction => (
                    <div key={restriction} className="flex items-center space-x-2">
                      <Checkbox
                        checked={preferences.restrictions.includes(restriction)}
                        onCheckedChange={() => 
                          toggleArrayItem(preferences.restrictions, restriction, 
                            (items) => updatePreference('restrictions', items))
                        }
                      />
                      <Label className="text-sm">{restriction}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Allergies */}
              <div>
                <Label className="text-base font-medium">Food Allergies</Label>
                <Input
                  placeholder="e.g., shellfish, soy, tree nuts"
                  className="mt-2"
                  onChange={(e) => updatePreference('allergies', e.target.value.split(',').map(s => s.trim()))}
                />
              </div>

              {/* Cooking Preferences */}
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-base font-medium">Cooking Skill</Label>
                  <Select value={preferences.cookingSkill} onValueChange={(value: any) => updatePreference('cookingSkill', value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-base font-medium">Time Available</Label>
                  <Select value={preferences.timeAvailable} onValueChange={(value: any) => updatePreference('timeAvailable', value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minimal">Minimal (15-20 min)</SelectItem>
                      <SelectItem value="moderate">Moderate (30-45 min)</SelectItem>
                      <SelectItem value="plenty">Plenty (60+ min)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-base font-medium">Budget</Label>
                  <Select value={preferences.budget} onValueChange={(value: any) => updatePreference('budget', value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tight">Tight budget</SelectItem>
                      <SelectItem value="moderate">Moderate budget</SelectItem>
                      <SelectItem value="flexible">Flexible budget</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={() => setCurrentStep(1)} className="w-full">
                Continue to Food Selection
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="food-selection" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-900">✅ Low-Mold Safe Foods</CardTitle>
                <CardDescription>These foods are safe for mold detox and anti-inflammatory</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {lowMoldFoods.map(food => (
                    <div key={food.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{food.name}</h4>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {food.category}
                          </Badge>
                          <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                            Low mold risk
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">
                          {food.nutrients.join(', ')}
                        </p>
                      </div>
                      <Checkbox
                        checked={selectedFoods.includes(food.id)}
                        onCheckedChange={() => 
                          toggleArrayItem(selectedFoods, food.id, setSelectedFoods)
                        }
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-red-900">❌ Foods to Avoid</CardTitle>
                <CardDescription>High mold risk foods to eliminate during detox</CardDescription>
              </CardHeader>
              <CardContent>
                <Alert className="mb-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Why avoid these foods?</AlertTitle>
                  <AlertDescription>
                    These foods are commonly contaminated with mycotoxins or promote inflammation, 
                    which can interfere with your detox process.
                  </AlertDescription>
                </Alert>
                <div className="space-y-2">
                  {highRiskFoods.map(food => (
                    <div key={food} className="flex items-center gap-2 p-2 bg-red-50 rounded">
                      <X className="h-4 w-4 text-red-600" />
                      <span className="text-red-900 text-sm">{food}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-4">
            <Button variant="outline" onClick={() => setCurrentStep(0)}>
              Back
            </Button>
            <Button onClick={() => setCurrentStep(2)} disabled={selectedFoods.length === 0}>
              Continue to Meal Planning
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="meal-planning" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generate Your Meal Plan</CardTitle>
              <CardDescription>
                Based on your preferences, we'll create a 7-day anti-inflammatory meal plan
              </CardDescription>
            </CardHeader>
            <CardContent>
              {mealPlan.length === 0 ? (
                <div className="text-center py-8">
                  <Utensils className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Generate Your Plan?</h3>
                  <p className="text-gray-600 mb-4">
                    We'll create personalized meals based on your selected foods and preferences.
                  </p>
                  <Button onClick={generateMealPlan} size="lg">
                    <Zap className="h-5 w-5 mr-2" />
                    Generate Meal Plan
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Your 7-Day Meal Plan</h3>
                    <Button variant="outline" onClick={exportMealPlan}>
                      <Download className="h-4 w-4 mr-2" />
                      Export Plan
                    </Button>
                  </div>
                  
                  {mealPlan.map((meal, index) => (
                    <Card key={`${meal.id}-${index}`}>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge variant="outline">{meal.type}</Badge>
                              <h4 className="font-medium">{meal.name}</h4>
                              {meal.antiInflammatory && (
                                <Badge className="bg-green-100 text-green-800">
                                  <Leaf className="h-3 w-3 mr-1" />
                                  Anti-inflammatory
                                </Badge>
                              )}
                              {meal.detoxSupporting && (
                                <Badge className="bg-blue-100 text-blue-800">
                                  <Heart className="h-3 w-3 mr-1" />
                                  Detox support
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              Prep: {meal.prepTime} min | Cook: {meal.cookTime} min | Serves: {meal.servings}
                            </p>
                            <p className="text-sm">
                              <strong>Ingredients:</strong> {meal.ingredients.join(', ')}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold text-primary-600">
                              {meal.nutrition.calories} cal
                            </div>
                            <div className="text-xs text-gray-600">
                              P: {meal.nutrition.protein}g | C: {meal.nutrition.carbs}g | F: {meal.nutrition.fat}g
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button variant="outline" onClick={() => setCurrentStep(1)}>
              Back
            </Button>
            {mealPlan.length > 0 && (
              <Button onClick={() => setCurrentStep(3)}>
                Continue to Shopping List
              </Button>
            )}
          </div>
        </TabsContent>

        <TabsContent value="shopping-list" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Shopping List</CardTitle>
              <CardDescription>
                Everything you need for your 7-day anti-inflammatory meal plan
              </CardDescription>
            </CardHeader>
            <CardContent>
              {shoppingList.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Generate a meal plan to see your shopping list
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Ingredients ({shoppingList.length} items)</h3>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download List
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {shoppingList.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 border rounded">
                        <Checkbox />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>

                  <Alert>
                    <ShoppingCart className="h-4 w-4" />
                    <AlertTitle>Shopping Tips</AlertTitle>
                    <AlertDescription>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Choose organic when possible, especially for the "Dirty Dozen"</li>
                        <li>Buy frozen vegetables and fruits if fresh isn't available</li>
                        <li>Look for grass-fed, pastured animal products</li>
                        <li>Check expiration dates carefully to avoid moldy foods</li>
                        <li>Store foods properly to prevent mold growth</li>
                      </ul>
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button variant="outline" onClick={() => setCurrentStep(2)}>
              Back
            </Button>
            <Button onClick={() => setCurrentStep(0)}>
              Start New Plan
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Educational Content */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-green-900">Anti-Inflammatory Foods</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Fatty fish (wild-caught salmon, sardines)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Leafy greens (kale, spinach, arugula)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Colorful vegetables (broccoli, bell peppers)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Low-mold fruits (fresh berries, citrus)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Healthy fats (avocado, coconut oil, olive oil)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Anti-inflammatory spices (turmeric, ginger)
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-blue-900">Detox-Supporting Nutrients</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-blue-600" />
                <strong>Sulfur compounds:</strong> Broccoli, cauliflower, garlic
              </li>
              <li className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-blue-600" />
                <strong>Antioxidants:</strong> Berries, green tea, dark leafy greens
              </li>
              <li className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-blue-600" />
                <strong>Fiber:</strong> Vegetables, low-mold fruits, seeds
              </li>
              <li className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-blue-600" />
                <strong>Omega-3s:</strong> Wild fish, flax seeds, chia seeds
              </li>
              <li className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-blue-600" />
                <strong>B vitamins:</strong> Grass-fed meat, leafy greens
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

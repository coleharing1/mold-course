/**
 * @fileoverview UI Elements Test Page - Comprehensive component testing area
 * Tests all UI components across different design themes
 */

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Slider } from '@/components/ui/slider'
// Switch component not available in current UI library
import { Checkbox } from '@/components/ui/checkbox'

export default function UIElementsPage() {
  const [progressValue, setProgressValue] = useState(65)
  const [sliderValue, setSliderValue] = useState([45])
  // Switch component not available

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">🧩 UI Elements Testing</h1>
        <p className="text-muted-foreground">
          Test all interface components across different design themes
        </p>
      </div>

      <div className="space-y-8">
        
        {/* Buttons Section */}
        <Card>
          <CardHeader>
            <CardTitle>Buttons & Actions</CardTitle>
            <CardDescription>Primary, secondary, and specialized buttons</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button>Primary Button</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button size="sm">Small</Button>
              <Button size="lg">Large Button</Button>
              <Button disabled>Disabled</Button>
            </div>
          </CardContent>
        </Card>

        {/* Form Elements */}
        <Card>
          <CardHeader>
            <CardTitle>Form Elements</CardTitle>
            <CardDescription>Inputs, labels, and form controls</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Enter password" />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Enter your message..." />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms">Accept terms and conditions</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="notifications" />
                  <Label htmlFor="notifications">Enable notifications</Label>
                </div>
                <div>
                  <Label>Severity Level: {sliderValue[0]}%</Label>
                  <Slider
                    value={sliderValue}
                    onValueChange={setSliderValue}
                    max={100}
                    step={1}
                    className="mt-2"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress & Status */}
        <Card>
          <CardHeader>
            <CardTitle>Progress & Status Elements</CardTitle>
            <CardDescription>Progress bars, badges, and status indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <Label>Recovery Progress</Label>
                  <span className="text-sm text-muted-foreground">{progressValue}%</span>
                </div>
                <Progress value={progressValue} className="mb-4" />
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => setProgressValue(Math.max(0, progressValue - 10))}>
                    -10%
                  </Button>
                  <Button size="sm" onClick={() => setProgressValue(Math.min(100, progressValue + 10))}>
                    +10%
                  </Button>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Status Badges</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="destructive">Error</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge className="bg-green-500 hover:bg-green-600">Success</Badge>
                  <Badge className="bg-yellow-500 hover:bg-yellow-600">Warning</Badge>
                  <Badge className="bg-blue-500 hover:bg-blue-600">Info</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cards & Containers */}
        <Card>
          <CardHeader>
            <CardTitle>Cards & Containers</CardTitle>
            <CardDescription>Different card styles and container layouts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-green-800">Success Card</CardTitle>
                  <CardDescription>Positive health outcome</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-green-700">Your drainage readiness score has improved!</p>
                </CardContent>
              </Card>
              
              <Card className="border-yellow-200 bg-yellow-50">
                <CardHeader>
                  <CardTitle className="text-yellow-800">Warning Card</CardTitle>
                  <CardDescription>Attention needed</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-yellow-700">Please complete prerequisite modules first.</p>
                </CardContent>
              </Card>
              
              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="text-red-800">Alert Card</CardTitle>
                  <CardDescription>Important safety notice</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-red-700">Consult healthcare provider before proceeding.</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Typography */}
        <Card>
          <CardHeader>
            <CardTitle>Typography Scale</CardTitle>
            <CardDescription>Text sizes and styles across themes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold">Heading 1 - Main Title</h1>
              <h2 className="text-3xl font-semibold">Heading 2 - Section Title</h2>
              <h3 className="text-2xl font-medium">Heading 3 - Subsection</h3>
              <h4 className="text-xl font-medium">Heading 4 - Component Title</h4>
              <p className="text-base">
                Body text - This is regular paragraph text used for most content. 
                It should be readable and comfortable for extended reading sessions.
              </p>
              <p className="text-sm text-muted-foreground">
                Small text - Used for captions, metadata, and secondary information.
              </p>
              <code className="text-sm bg-muted px-2 py-1 rounded">
                Code text - For technical content and data
              </code>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}

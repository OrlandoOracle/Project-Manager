import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DragDrop from './components/DragDrop'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container mx-auto py-10">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <DragDrop />
          <p className="text-sm text-muted-foreground">
            Make changes to your account here. Click save when you're done.
          </p>
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="Pedro Duarte" />
          </div>
          <Button>Save changes</Button>
        </TabsContent>
        <TabsContent value="password">
          <p className="text-sm text-muted-foreground">
            Change your password here. After saving, you'll be logged out.
          </p>
          <div className="grid gap-2">
            <Label htmlFor="current">Current password</Label>
            <Input id="current" type="password" />
          </div>
          <Button>Save password</Button>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default App

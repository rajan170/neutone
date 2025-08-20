"use client"

import { Switch } from "~/components/ui/switch";
import { Plus } from "lucide-react";
import { useState } from "react"
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Textarea } from "~/components/ui/textarea";

export function SongPanel(){
    const [mode, setMode] = useState<"basic" | "advanced">("basic");
    const [description, setDescription] = useState("")
    const [instrumental, setInstrumental] = useState(false)


    
    return(
        <div className="bg-muted/50 flex w-full flex-col lg:w-80">
            <div className="flex-1 overflow-y-auto p-4">
                <Tabs 
                value={mode}
                onValueChange={(value) => setMode(value as "basic" | "advanced")}
                >
                    <TabsList className="w-full">
                        <TabsTrigger value="basic">Basic</TabsTrigger>
                        <TabsTrigger value="advanced">Advanced</TabsTrigger>
                    </TabsList>

                    <TabsContent value="basic" className="space-y-6 mt-6">
                        <div className="flex flex-col gap-3">
                            <label className="text-sm font-medium">Describe your song</label>
                            <Textarea 
                            className="resize-none text-muted-foreground min-h-[190px]" 
                            placeholder="A song about a cat's life in the city" 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <Button variant="outline"
                             size="sm" 
                             onClick={() => setMode("advanced")}
                             className="text-sm text-white cursor-pointer bg-black hover:bg-black/80 hover:text-white">
                                <Plus className="mr-2"/>
                                Lyrics
                            </Button>
                            <div className="flex items-center gap-2">
                                <label className="text-sm font-medium">Instrumental</label>
                                <Switch checked={instrumental} onCheckedChange={setInstrumental}/>

                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
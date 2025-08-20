"use client"

import { Switch } from "~/components/ui/switch";
import { Plus, Check } from "lucide-react";
import { useState } from "react"
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Textarea } from "~/components/ui/textarea";

export function SongPanel(){
    const [mode, setMode] = useState<"basic" | "advanced">("basic");
    const [description, setDescription] = useState("")
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const [instrumental, setInstrumental] = useState(false)
    

    // Computed value that combines description with selected tags
    const combinedContent = `${description}${selectedTags.length > 0 ? ', ' + selectedTags.join(', ') : ''}`

    const inspirationTags = [
        "Hip-Hop", "R&B", "Pop", "Rock", "Electronic", 
        "Latin", "K-pop", "Country", "Afrobeat", 
        "Indie", "Alternative", "Lo-fi", "Soul", 
        "Metal", "Reggae", "Funk", "House", 
        "Techno", "Trance", "Jazz", "Classical", 
        "Blues", "Folk", "Punk", "Gospel", "Goth",
        "Chill", "Happy", "Energetic", "Party", 
        "Romantic", "Sad", "Relaxing", "Epic", "Dark", "Cinematic"
      ]

       

    const handleInspirationTagClick = (tag: string) => {
    if(!selectedTags.includes(tag)){
        const newTags = [...selectedTags, tag]
        setSelectedTags(newTags)
        // console.log('✅ Added tag:', tag)
        // console.log('📝 New selectedTags:', newTags)
        // console.log('🔗 Combined content:', `${description}${newTags.length > 0 ? ', ' + newTags.join(', ') : ''}`)
    } else {
        const newTags = selectedTags.filter(t => t !== tag)
        setSelectedTags(newTags)
        // console.log('❌ Removed tag:', tag)
        // console.log('📝 New selectedTags:', newTags)
        // console.log('🔗 Combined content:', `${description}${newTags.length > 0 ? ', ' + newTags.join(', ') : ''}`)
    }
}

    
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
                            <input type="hidden" value={combinedContent}/>
                            {/* <input type="text" value={combinedContent} readOnly className="text-xs bg-gray-100 p-1 mt-2" placeholder="Combined content will appear here"/> */}
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

                        <div className="flex flex-col gap-3">
                            <label className="text-sm font-medium">Tags:</label>
                            <div className="w-full overflow-y-auto max-h-37 border border-border rounded-md p-3 relative">
                                <div className="flex flex-wrap gap-2 pb-2">
                                    {inspirationTags.map((tag) => {
                                        const isSelected = selectedTags.includes(tag);
                                        return (
                                            <Button 
                                            key={tag}
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleInspirationTagClick(tag)}
                                            className={`h-7 text-xs ${isSelected ? 'bg-black text-white hover:bg-black/80 hover:text-white' : 'bg-transparent hover:bg-transparent'}`}>
                                                {isSelected ? <Check className="mr-1" /> : <Plus className="mr-1" />}
                                                {tag}
                                            </Button>
                                        );
                                    })}
                                </div>
                                
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
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
    const [lyricsMode, setLyricsMode] = useState<"write" | "auto">("write")
    const [lyrics, setLyrics] = useState("")
    const [styleInput, setStyleInput] = useState("")
    

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
        } else {
            const newTags = selectedTags.filter(t => t !== tag)
            setSelectedTags(newTags)
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

                    <TabsContent value="advanced" className="space-y-6 mt-6">
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <label className="text-sm font-medium">Lyrics</label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                    variant="ghost"
                                    onClick={() => {
                                        setLyricsMode("auto");
                                        setLyrics("")
                                    }}
                                    size="sm" 
                                    className={`h-8 px-3 text-xs font-medium transition-all duration-200 ${
                                        lyricsMode === "auto" 
                                            ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-md hover:bg-blue-100 hover:shadow-lg' 
                                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:shadow-sm'
                                    }`}>
                                        Auto
                                    </Button>

                                    <Button
                                    variant="ghost"
                                    onClick={() => {
                                        setLyricsMode("write");
                                        setLyrics("")
                                    }}
                                    size="sm" 
                                    className={`h-8 px-3 text-xs font-medium transition-all duration-200 ${
                                        lyricsMode === "write" 
                                            ? 'bg-green-50 text-green-700 border border-green-200 shadow-md hover:bg-green-100 hover:shadow-lg' 
                                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:shadow-sm'
                                    }`}>
                                        Write
                                    </Button>
                                </div>
                            </div>

                             <Textarea 
                             value={lyrics} 
                             placeholder={lyricsMode === "write" ? "Write your lyrics here" : "Describe your song to generate lyrics"}
                             onChange={(e) => setLyrics(e.target.value)}
                             className="min-h-[190px] resize-none"
                             />


                            <input type="hidden" value={combinedContent}/>
                                    
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium">Instrumental</label>
                                <Switch 
                                checked={instrumental} 
                                onCheckedChange={setInstrumental}/>
                            </div>
                            

                            <div className="flex flex-col gap-3 mt-6 mb-6">
                                <label className="text-sm font-medium">Styles</label>
                                <Textarea 
                                placeholder="Write custom styles"
                                value={styleInput}
                                onChange={(e) => setStyleInput(e.target.value)}
                                className="resize-none min-h-[100px]"
                                />
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
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
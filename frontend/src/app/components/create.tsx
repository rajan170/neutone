"use client"

import { generateSong } from "~/actions/generate"
import { Button } from "~/components/ui/button"

export default function CreateSong() {
    return (
    <Button onClick={() => { void generateSong({})}}>Generate Song</Button>
)
}
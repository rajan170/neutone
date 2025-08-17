"use client"

import { queueSong } from "~/actions/generate"
import { Button } from "~/components/ui/button"

export default function CreateSong() {
    return (
    <Button onClick={() => { void queueSong()}}>Generate Song</Button>
)
}
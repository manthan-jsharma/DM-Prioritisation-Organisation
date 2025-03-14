"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Settings } from "lucide-react";

export default function SpamSettings() {
  const [spamThreshold, setSpamThreshold] = useState(3);
  const [enableHeuristics, setEnableHeuristics] = useState(true);

  const handleSave = () => {
    // In a real app, this would save the settings to the server
    console.log({
      spamThreshold,
      enableHeuristics,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings className="h-4 w-4" />
          Spam Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Spam Detection Settings</DialogTitle>
          <DialogDescription>
            Customize how the app detects and filters spam emails.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <span>Spam Threshold ({spamThreshold})</span>
              <Slider
                className="w-[60%]"
                min={1}
                max={10}
                step={1}
                value={[spamThreshold]}
                onValueChange={(value) => setSpamThreshold(value[0])}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Higher values mean fewer emails will be marked as spam.
            </p>
          </div>

          <div className="flex items-center justify-between">
            <span>Use Heuristic Detection</span>
            <Switch
              checked={enableHeuristics}
              onCheckedChange={setEnableHeuristics}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

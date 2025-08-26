
"use client";

import { PhotoAnalysisForm } from "@/components/photo-analysis-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Upload } from "lucide-react";
import { CameraCapture } from "@/components/camera-capture";

export default function PhotoAnalysisPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">AI Photo Analysis</CardTitle>
          <CardDescription>
            Upload a photo or use your camera to capture an image of a vehicle part or area of concern. Our AI will analyze it to identify potential issues, estimate severity, and suggest next steps.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload"><Upload className="mr-2"/> Upload Photo</TabsTrigger>
              <TabsTrigger value="camera"><Camera className="mr-2"/> Use Camera</TabsTrigger>
            </TabsList>
            <TabsContent value="upload">
                <Card className="mt-4 border-0 shadow-none">
                    <CardContent className="p-2">
                      <PhotoAnalysisForm />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="camera">
                <Card className="mt-4 border-0 shadow-none">
                    <CardContent className="p-2">
                      <CameraCapture />
                    </CardContent>
                </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

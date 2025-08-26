
"use client";

import { useState } from "react";
import Image from "next/image";
import { analyzePhoto, type AnalyzePhotoOutput } from "@/ai/flows/photo-analysis";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { UploadCloud, X, AlertTriangle, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PhotoAnalysisForm() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalyzePhotoOutput | null>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 4 * 1024 * 1024) { // 4MB limit
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please upload an image smaller than 4MB.",
        });
        return;
      }
      setFile(selectedFile);
      setResult(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleRemoveImage = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file || !preview) {
      toast({
        variant: "destructive",
        title: "No file selected",
        description: "Please upload an image to analyze.",
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const analysisResult = await analyzePhoto({ photoDataUri: preview });
      setResult(analysisResult);
    } catch (error) {
      console.error("Analysis failed:", error);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="photo-upload" className="block text-sm font-medium text-foreground mb-2">
            Upload Diagnostic Photo
          </label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-border px-6 py-10">
            {preview ? (
              <div className="relative text-center">
                <Image
                  src={preview}
                  alt="Image preview"
                  width={200}
                  height={200}
                  className="mx-auto h-48 w-48 object-contain rounded-md"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2 h-7 w-7 rounded-full"
                  onClick={handleRemoveImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                <div className="mt-4 flex text-sm leading-6 text-muted-foreground">
                  <label
                    htmlFor="photo-upload"
                    className="relative cursor-pointer rounded-md font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 hover:text-primary/80"
                  >
                    <span>Upload a file</span>
                    <Input
                      id="photo-upload"
                      name="photo-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                      accept="image/png, image/jpeg, image/webp"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-muted-foreground/80">PNG, JPG, WEBP up to 4MB</p>
              </div>
            )}
          </div>
        </div>
        <Button type="submit" className="w-full" disabled={!file || isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            "Analyze Photo"
          )}
        </Button>
      </form>

      {result && (
        <div>
          <h3 className="text-xl font-semibold mb-4 font-headline">Analysis Results</h3>
          <div className="space-y-4">
            {result.identifiedIssues && result.identifiedIssues.length > 0 ? (
              result.identifiedIssues.map((issue, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{issue}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">Confidence:</span>
                        <Progress value={result.confidenceLevels[index] * 100} className="w-[60%]" />
                        <span className="font-mono text-sm font-bold">
                            {(result.confidenceLevels[index] * 100).toFixed(0)}%
                        </span>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
                <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>No Issues Identified</AlertTitle>
                    <AlertDescription>
                        The AI did not identify any specific issues in the photo. Please ensure the image is clear and well-lit.
                    </AlertDescription>
                </Alert>
            )}
            {result.additionalNotes && (
                 <Alert variant="default" className="bg-secondary">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Additional Notes</AlertTitle>
                    <AlertDescription>
                        {result.additionalNotes}
                    </AlertDescription>
                </Alert>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

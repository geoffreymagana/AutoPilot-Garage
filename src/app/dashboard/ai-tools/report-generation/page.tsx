
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { generateDiagnosticReport, type GenerateDiagnosticReportOutput } from "@/ai/flows/report-generation";
import { Loader2, FileText, Wand2, UploadCloud, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function ReportGenerationPage() {
    const [diagnosticData, setDiagnosticData] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<GenerateDiagnosticReportOutput | null>(null);
    const { toast } = useToast();
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

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
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!diagnosticData) {
            toast({
                variant: "destructive",
                title: "Input Required",
                description: "Please enter diagnostic data to generate a report.",
            });
            return;
        }

        setIsLoading(true);
        setResult(null);
        try {
            // In a real implementation, you would combine text and image data for the AI flow.
            // For now, we'll just use the text data.
            const report = await generateDiagnosticReport({ diagnosticData });
            
            const recommendationsArray = report.recommendations.split('. ').filter(r => r);
            const formattedRecommendations = recommendationsArray.map(r => `• ${r}`).join('\n');

            setResult({
                ...report,
                recommendations: formattedRecommendations,
            });

        } catch (error) {
            toast({
                variant: "destructive",
                title: "Generation Failed",
                description: "An error occurred while generating the report.",
            });
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

  return (
    <div className="grid md:grid-cols-2 gap-8">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Wand2 /> AI Report Generation</CardTitle>
                <CardDescription>Enter raw diagnostic data (e.g., error codes, sensor readings, mechanic notes) and optionally upload an image of handwritten notes to generate a summarized report with recommendations.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="diagnostic-data">Diagnostic Data</Label>
                        <Textarea 
                            id="diagnostic-data"
                            placeholder="e.g., P0300 Random Misfire Detected. Fuel trim at 15%. Customer reports rough idle..."
                            rows={8}
                            value={diagnosticData}
                            onChange={(e) => setDiagnosticData(e.target.value)}
                        />
                    </div>
                     <div>
                        <Label htmlFor="photo-upload">Upload Notes (Optional)</Label>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-border px-6 py-6">
                            {preview ? (
                            <div className="relative text-center">
                                <Image
                                src={preview}
                                alt="Image preview"
                                width={150}
                                height={150}
                                className="mx-auto h-24 w-auto object-contain rounded-md"
                                />
                                <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                                onClick={handleRemoveImage}
                                >
                                <X className="h-4 w-4" />
                                </Button>
                            </div>
                            ) : (
                            <div className="text-center">
                                <UploadCloud className="mx-auto h-10 w-10 text-muted-foreground" />
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
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Generate Report
                    </Button>
                </form>
            </CardContent>
        </Card>
        <Card>
             <CardHeader>
                <CardTitle className="flex items-center gap-2"><FileText /> Generated Report</CardTitle>
                <CardDescription>The AI-generated summary and recommendations will appear here.</CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading && (
                    <div className="flex items-center justify-center h-48">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                )}
                {result ? (
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-semibold text-lg mb-2">Diagnostic Summary</h3>
                            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{result.summary}</p>
                        </div>
                         <div>
                            <h3 className="font-semibold text-lg mb-2">Recommendations</h3>
                            <div className="text-sm text-muted-foreground whitespace-pre-wrap prose dark:prose-invert">
                                <ul>
                                    {result.recommendations.split('\\n').filter(r => r).map((rec, i) => (
                                        <li key={i}>{rec.replace('• ', '')}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ) : (
                    !isLoading && (
                         <div className="flex flex-col items-center justify-center h-48 text-center text-muted-foreground">
                            <FileText className="h-12 w-12 mb-4" />
                            <p>Your report is pending generation.</p>
                        </div>
                    )
                )}
            </CardContent>
        </Card>
    </div>
  );
}

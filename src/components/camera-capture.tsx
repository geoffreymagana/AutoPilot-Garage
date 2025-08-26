
"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { analyzePhoto, type AnalyzePhotoOutput } from "@/ai/flows/photo-analysis";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Camera, Loader2, Send, Zap, RefreshCw } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';

export function CameraCapture() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<AnalyzePhotoOutput | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        const getCameraPermission = async () => {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                console.error('Camera API is not supported by this browser.');
                setHasCameraPermission(false);
                toast({
                    variant: "destructive",
                    title: "Unsupported Browser",
                    description: "Your browser does not support camera access.",
                });
                return;
            }

            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
                setHasCameraPermission(true);
            } catch (error) {
                console.error('Error accessing camera:', error);
                setHasCameraPermission(false);
                toast({
                    variant: 'destructive',
                    title: 'Camera Access Denied',
                    description: 'Please enable camera permissions in your browser settings to use this feature.',
                });
            }
        };

        getCameraPermission();

        return () => {
             if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [toast]);

    const handleCapture = useCallback(() => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            if (context) {
                context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
                const dataUri = canvas.toDataURL('image/jpeg');
                setCapturedImage(dataUri);
                setResult(null);
            }
        }
    }, []);

    const handleRetake = () => {
        setCapturedImage(null);
        setResult(null);
    };

    const handleAnalyze = async () => {
        if (!capturedImage) return;

        setIsLoading(true);
        setResult(null);
        try {
            const analysisResult = await analyzePhoto({ photoDataUri: capturedImage });
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
        <div className="space-y-6">
            {hasCameraPermission === false && (
                <Alert variant="destructive">
                    <AlertTitle>Camera Access Required</AlertTitle>
                    <AlertDescription>
                        Please allow camera access in your browser settings to use this feature. You may need to refresh the page after granting permission.
                    </AlertDescription>
                </Alert>
            )}

            <div className="relative aspect-video w-full overflow-hidden rounded-md border bg-secondary">
                 <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline style={{ display: capturedImage ? 'none' : 'block' }}/>
                 {capturedImage && <Image src={capturedImage} alt="Captured" layout="fill" objectFit="cover" />}
                 {hasCameraPermission === null && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                        <p className="ml-2">Initializing camera...</p>
                    </div>
                )}
            </div>
            <canvas ref={canvasRef} style={{ display: 'none' }} />

            <div className="flex justify-center gap-4">
                {capturedImage ? (
                    <>
                        <Button variant="outline" onClick={handleRetake} disabled={isLoading}>
                            <RefreshCw className="mr-2" /> Retake
                        </Button>
                        <Button onClick={handleAnalyze} disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 animate-spin" /> : <Zap className="mr-2" />}
                            Analyze
                        </Button>
                    </>
                ) : (
                    <Button onClick={handleCapture} disabled={!hasCameraPermission}>
                        <Camera className="mr-2" /> Capture Image
                    </Button>
                )}
            </div>

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
                                <Zap className="h-4 w-4" />
                                <AlertTitle>No Issues Identified</AlertTitle>
                                <AlertDescription>
                                    The AI did not identify any specific issues in the photo. Please ensure the image is clear and well-lit.
                                </AlertDescription>
                            </Alert>
                        )}
                        {result.additionalNotes && (
                            <Alert variant="default" className="bg-secondary">
                                <Zap className="h-4 w-4" />
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

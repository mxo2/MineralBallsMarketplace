import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertVideoSchema, type Video, type InsertVideo } from "@shared/schema";
import { Trash2, Plus, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminVideoPanel() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);

  const { data: videos = [], isLoading } = useQuery<Video[]>({
    queryKey: ['/api/videos'],
  });

  const form = useForm<InsertVideo>({
    resolver: zodResolver(insertVideoSchema),
    defaultValues: {
      title: "",
      description: "",
      videoUrl: "",
      thumbnailUrl: "",
      isActive: true,
      displayOrder: 0,
    },
  });

  const createVideoMutation = useMutation({
    mutationFn: (data: InsertVideo) => apiRequest("/api/videos", "POST", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/videos'] });
      setIsDialogOpen(false);
      form.reset();
      toast({ title: "Video added successfully!" });
    },
    onError: () => {
      toast({ title: "Failed to add video", variant: "destructive" });
    },
  });

  const updateVideoMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<InsertVideo> }) => 
      apiRequest(`/api/videos/${id}`, "PUT", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/videos'] });
      setIsDialogOpen(false);
      setEditingVideo(null);
      form.reset();
      toast({ title: "Video updated successfully!" });
    },
    onError: () => {
      toast({ title: "Failed to update video", variant: "destructive" });
    },
  });

  const deleteVideoMutation = useMutation({
    mutationFn: (id: number) => apiRequest(`/api/videos/${id}`, "DELETE"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/videos'] });
      toast({ title: "Video deleted successfully!" });
    },
    onError: () => {
      toast({ title: "Failed to delete video", variant: "destructive" });
    },
  });

  const onSubmit = (data: InsertVideo) => {
    if (editingVideo) {
      updateVideoMutation.mutate({ id: editingVideo.id, data });
    } else {
      createVideoMutation.mutate(data);
    }
  };

  const handleEdit = (video: Video) => {
    setEditingVideo(video);
    form.reset({
      title: video.title,
      description: video.description || "",
      videoUrl: video.videoUrl,
      thumbnailUrl: video.thumbnailUrl || "",
      isActive: video.isActive,
      displayOrder: video.displayOrder,
    });
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingVideo(null);
    form.reset();
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading videos...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-amber-900">Video Management</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew} className="bg-amber-900 hover:bg-amber-800">
              <Plus className="h-4 w-4 mr-2" />
              Add Video
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingVideo ? "Edit Video" : "Add New Video"}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Video title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Video description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="videoUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Video URL</FormLabel>
                      <FormControl>
                        <Input placeholder="/attached_assets/your-video.mp4" {...field} />
                      </FormControl>
                      <div className="text-xs text-gray-500 mt-1">
                        • For local files: /attached_assets/filename.mp4<br/>
                        • For external: https://example.com/video.mp4
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="thumbnailUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thumbnail URL (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/thumbnail.jpg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="displayOrder"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Order</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="0" 
                          {...field} 
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex gap-2 pt-4">
                  <Button 
                    type="submit" 
                    className="flex-1 bg-amber-900 hover:bg-amber-800"
                    disabled={createVideoMutation.isPending || updateVideoMutation.isPending}
                  >
                    {editingVideo ? "Update" : "Add"} Video
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {videos.map((video) => (
          <Card key={video.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg">{video.title}</CardTitle>
                  {video.description && (
                    <p className="text-sm text-muted-foreground mt-1">{video.description}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(video)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteVideoMutation.mutate(video.id)}
                    disabled={deleteVideoMutation.isPending}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="w-32 aspect-[9/16] bg-amber-100 rounded overflow-hidden">
                  <video 
                    className="w-full h-full object-cover"
                    poster={video.thumbnailUrl || undefined}
                    muted
                  >
                    <source src={video.videoUrl} type="video/mp4" />
                  </video>
                </div>
                <div className="flex-1 space-y-2 text-sm">
                  <p><strong>Video URL:</strong> {video.videoUrl}</p>
                  {video.thumbnailUrl && (
                    <p><strong>Thumbnail:</strong> {video.thumbnailUrl}</p>
                  )}
                  <p><strong>Display Order:</strong> {video.displayOrder}</p>
                  <p><strong>Status:</strong> {video.isActive ? "Active" : "Inactive"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {videos.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">No videos added yet. Click "Add Video" to get started.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
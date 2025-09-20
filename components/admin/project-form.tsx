"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Plus, Save, Eye } from "lucide-react"
import type { Project } from "@/lib/storage"

interface ProjectFormProps {
  project?: Project
  onSave: (project: Omit<Project, "id" | "createdAt" | "updatedAt">) => void
  onCancel: () => void
}

export function ProjectForm({ project, onSave, onCancel }: ProjectFormProps) {
  const [formData, setFormData] = useState({
    title: project?.title || "",
    description: project?.description || "",
    tech: project?.tech || [],
    image: project?.image || "",
    github: project?.github || "",
    live: project?.live || "",
    status: project?.status || ("Draft" as const),
  })
  const [newTech, setNewTech] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const addTech = () => {
    if (newTech.trim() && !formData.tech.includes(newTech.trim())) {
      setFormData((prev) => ({
        ...prev,
        tech: [...prev.tech, newTech.trim()],
      }))
      setNewTech("")
    }
  }

  const removeTech = (techToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tech: prev.tech.filter((tech) => tech !== techToRemove),
    }))
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{project ? "Edit Project" : "Add New Project"}</h1>
          <p className="text-gray-400">{project ? "Update project details" : "Create a new portfolio project"}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={onCancel}
            className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
          >
            Cancel
          </Button>
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Basic Information */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-gray-300">
                  Project Title
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  className="bg-gray-700/50 border-gray-600 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="description" className="text-gray-300">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="bg-gray-700/50 border-gray-600 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="status" className="text-gray-300">
                  Status
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: "Published" | "Draft") => setFormData((prev) => ({ ...prev, status: value }))}
                >
                  <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="Draft" className="text-white">
                      Draft
                    </SelectItem>
                    <SelectItem value="Published" className="text-white">
                      Published
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Links and Media */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Links & Media</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="image" className="text-gray-300">
                  Image URL
                </Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.value }))}
                  className="bg-gray-700/50 border-gray-600 text-white"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <Label htmlFor="github" className="text-gray-300">
                  GitHub URL
                </Label>
                <Input
                  id="github"
                  value={formData.github}
                  onChange={(e) => setFormData((prev) => ({ ...prev, github: e.target.value }))}
                  className="bg-gray-700/50 border-gray-600 text-white"
                  placeholder="https://github.com/username/repo"
                />
              </div>
              <div>
                <Label htmlFor="live" className="text-gray-300">
                  Live Demo URL
                </Label>
                <Input
                  id="live"
                  value={formData.live}
                  onChange={(e) => setFormData((prev) => ({ ...prev, live: e.target.value }))}
                  className="bg-gray-700/50 border-gray-600 text-white"
                  placeholder="https://example.com"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Technologies */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Technologies Used</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                placeholder="Add technology (e.g., React, Node.js)"
                className="bg-gray-700/50 border-gray-600 text-white"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTech())}
              />
              <Button type="button" onClick={addTech} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tech.map((tech, index) => (
                <Badge key={index} variant="secondary" className="bg-blue-500/20 text-blue-300 pr-1">
                  {tech}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeTech(tech)}
                    className="ml-1 h-4 w-4 p-0 hover:bg-red-500/20"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" className="bg-green-600 hover:bg-green-700">
            <Save className="h-4 w-4 mr-2" />
            {project ? "Update Project" : "Create Project"}
          </Button>
        </div>
      </form>
    </div>
  )
}

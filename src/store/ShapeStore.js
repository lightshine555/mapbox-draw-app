// src/store/ShapeStore.js
import { makeObservable, observable, action, computed } from 'mobx';

class ShapeStore {
  shapes = []; // Array to hold GeoJSON features

  constructor() {
    makeObservable(this, {
      shapes: observable,
      addShape: action,
      updateShape: action,
      deleteShape: action,
      setShapes: action,
      shapeCount: computed,
    });
  }

  // Action to replace all shapes (e.g., on initial load or full sync)
  setShapes(features) {
    // Assign new IDs if they don't have one (Mapbox Draw usually provides them)
    this.shapes = features.map(f => ({ ...f, id: f.id || crypto.randomUUID() }));
  }

  // Action to add a single shape
  addShape(feature) {
    // Ensure it has an ID
    const newShape = { ...feature, id: feature.id || crypto.randomUUID() };
    this.shapes.push(newShape);
    console.log("Shape added to store:", newShape);
  }

  // Action to update shapes (usually comes as an array from draw.update)
  updateShape(updatedFeatures) {
     updatedFeatures.forEach(updatedFeature => {
        const index = this.shapes.findIndex(s => s.id === updatedFeature.id);
        if (index !== -1) {
          // Replace the old feature with the updated one
          this.shapes[index] = { ...updatedFeature };
           console.log("Shape updated in store:", this.shapes[index]);
        } else {
          // Should not happen in typical draw.update flow, but handle defensively
          console.warn("Attempted to update shape not found in store:", updatedFeature.id);
          // Optionally add it if missing?
          // this.addShape(updatedFeature);
        }
     });
  }

  // Action to delete shapes (usually comes as an array from draw.delete)
  deleteShape(deletedFeatures) {
    const deletedIds = new Set(deletedFeatures.map(f => f.id));
    this.shapes = this.shapes.filter(s => !deletedIds.has(s.id));
    console.log("Shapes deleted from store. IDs:", Array.from(deletedIds));
  }

  // Computed property example
  get shapeCount() {
    return this.shapes.length;
  }

  // Helper to get shape by ID (optional)
  getShapeById(id) {
      return this.shapes.find(s => s.id === id);
  }
}

// Export a singleton instance of the store
const shapeStore = new ShapeStore();
export default shapeStore;
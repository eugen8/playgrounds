# Here's the Python code to plot a 10x10 grid, rotate it 10 degrees, and plot the transformed grid:
# This code defines functions to create the grid lines, rotate points based on an angle, and plots the grids. It uses NumPy for array manipulation and Matplotlib for plotting. The rotated grid is plotted with red lines on top of the original black grid for better visualization.

import numpy as np
import matplotlib.pyplot as plt

# Define grid size
grid_size = 10

# Create x and y coordinates for grid lines
x = np.linspace(0, grid_size, grid_size + 1)
y = np.linspace(0, grid_size, grid_size + 1)

# Function to rotate points around origin
def rotate(x, y, angle):
  radians = np.radians(angle)
  rot_matrix = np.array([[np.cos(radians), -np.sin(radians)],
                         [np.sin(radians),  np.cos(radians)]])
  new_coords = np.dot(rot_matrix, np.vstack([x, y]))
  return new_coords[0, :], new_coords[1, :]

# Plot original grid
plt.figure(figsize=(8, 8))
plt.plot(x, np.repeat(y[0], len(x)), 'k-', linewidth=1)  # Horizontal lines
plt.plot(np.repeat(x[0], len(y)), y, 'k-', linewidth=1)  # Vertical lines
plt.xlim(0, grid_size)
plt.ylim(0, grid_size)
plt.title("Original Grid")
plt.xlabel("X")
plt.ylabel("Y")
plt.grid(True)

# Rotate grid points by 10 degrees
x_rot, y_rot = rotate(x, y, 10)

# Plot rotated grid (red lines)
plt.plot(x_rot, y_rot, 'r-', linewidth=1)

plt.title("Rotated Grid (10 degrees)")
plt.show()
# Here is the Python code to plot a 10x10 grid, apply a 10-degree rotation transformation, and plot it again:


import numpy as np
import matplotlib.pyplot as plt
# Create a 10x10 grid
x, y = np.meshgrid(np.arange(10), np.arange(10))
# Plot the original grid
plt.figure(figsize=(6, 6))
plt.plot(x, y, 'k-')
plt.title("Original Grid")
plt.gca().set_aspect('equal', adjustable='box')
plt.show()
# Apply a 10-degree rotation transformation
theta = 10 * np.pi / 180 # convert degrees to radians
R = np.array([[np.cos(theta), -np.sin(theta)], [np.sin(theta), np.cos(theta)]])
x_rot, y_rot = np.dot(np.column_stack((x.ravel(), y.ravel())), R).T
x_rot, y_rot = x_rot.reshape(x.shape), y_rot.reshape(y.shape)
# Plot the rotated grid
plt.figure(figsize=(6, 6))
plt.plot(x_rot, y_rot, 'k-')
plt.title("Rotated Grid (10 degrees)")
plt.gca().set_aspect('equal', adjustable='box')
plt.show()

# This code uses NumPy for numerical computations and Matplotlib for plotting. It first creates a 10x10 grid using `np.meshgrid`, then plots it using `plt.plot`. The grid is rotated by applying a rotation matrix `R` to the grid coordinates, and the resulting rotated grid is plotted again.
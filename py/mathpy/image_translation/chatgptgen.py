# Create python code to plot an image of a 10 by 10 grid. Then apply a transformation to rotate the grid 10 degrees and plot it again.

import matplotlib.pyplot as plt
import numpy as np
from matplotlib.transforms import Affine2D

# Create a 10 by 10 grid
x, y = np.meshgrid(np.arange(11), np.arange(11))

# Plot the original grid
fig, ax = plt.subplots()
ax.plot(x, y, color='black')
ax.plot(x.T, y.T, color='black')
ax.set_title('Original 10x10 Grid')
ax.set_aspect('equal')

# Apply a 10 degree rotation transformation
transform = Affine2D().rotate_deg(10)

# Plot the transformed grid
fig, ax = plt.subplots()

# Flatten the grid for transformation
x_flat = x.flatten()
y_flat = y.flatten()
points = np.vstack((x_flat, y_flat)).T
transformed_points = transform.transform(points)

# Reshape back to grid form
x_transformed = transformed_points[:, 0].reshape(11, 11)
y_transformed = transformed_points[:, 1].reshape(11, 11)

ax.plot(x_transformed, y_transformed, color='black')
ax.plot(x_transformed.T, y_transformed.T, color='black')

ax.set_title('Rotated 10x10 Grid by 10 Degrees')
ax.set_aspect('equal')

plt.show()

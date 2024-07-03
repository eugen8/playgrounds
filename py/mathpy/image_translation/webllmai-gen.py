# https://chat.webllm.ai/  - in the browser
# Create python code to plot an image of a 10 by 10 grid. Then apply a transformation to rotate the grid 10 degrees and plot it again.

# Here is some Python code using the NumPy and Matplotlib libraries to create a 10x10 grid, rotate it by 10 degrees, and plot the result:

import numpy as np
import matplotlib.pyplot as plt
import matplotlib.transforms as transforms

# Create a 10x10 grid of ones
grid = np.ones((10, 10))

# Define the rotation angle in degrees
angle = 10

# Define the rotation transformation
trans = transforms.Affine2D().rotate(np.deg2rad(angle))

# Create a figure and axis
fig, ax = plt.subplots()

# Plot the original grid
ax.imshow(grid, cmap='gray', extent=(0, 10, 0, 10))

# Apply the rotation transformation to the axis
ax.set_transform(trans + ax.transData)

# Plot the rotated grid
ax.imshow(grid, cmap='gray', extent=(0, 10, 0, 10))

# Show the plot
plt.show()


# This code creates a 10x10 grid of ones, defines a rotation angle of 10 degrees, and applies the rotation transformation to the axis using the Affine2D class from the matplotlib.transforms module. The original grid is plotted, then the rotated grid is plotted again, and the resulting plot is displayed.
# Note that the extent argument in the imshow function is used to specify the extent of the image in data coordinates. In this case, we're using the same extent for both plots, which means that the rotation will be applied relative to the origin of the grid. If you want to rotate the grid around a different point, you'll need to adjust the extent accordingly.
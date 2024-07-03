# Here's Python code to create a 10x10 grid, plot it, rotate it by 10 degrees, and plot the rotated grid:
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle
from matplotlib.transforms import Affine2D

def create_grid(size=10):
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))
    
    # Create original grid
    for i in range(size + 1):
        ax1.axhline(i, color='black', linewidth=1)
        ax1.axvline(i, color='black', linewidth=1)
    
    ax1.set_xlim(0, size)
    ax1.set_ylim(0, size)
    ax1.set_aspect('equal', adjustable='box')
    ax1.set_title('Original Grid')

    # Create rotated grid
    rotation = Affine2D().rotate_deg(10) + ax2.transData
    for i in range(size + 1):
        ax2.axhline(i, color='black', linewidth=1, transform=rotation)
        ax2.axvline(i, color='black', linewidth=1, transform=rotation)
    
    ax2.set_xlim(-1, size+1)
    ax2.set_ylim(-1, size+1)
    ax2.set_aspect('equal', adjustable='box')
    ax2.set_title('Rotated Grid (10 degrees)')

    plt.tight_layout()
    plt.show()

create_grid()

# This code does the following:

# We import the necessary libraries: numpy for numerical operations, and matplotlib for plotting.
# We define a function create_grid() that creates two subplots side by side.
# In the first subplot (ax1), we create the original 10x10 grid using axhline and axvline to draw horizontal and vertical lines.
# In the second subplot (ax2), we create the rotated grid. We use matplotlib's Affine2D transformation to rotate the grid by 10 degrees.
# We set appropriate limits and aspect ratios for both plots to ensure they display correctly.
# Finally, we display the plot using plt.show().

# When you run this code, it will display two grids side by side: the original 10x10 grid on the left, and the same grid rotated by 10 degrees on the right.
# Would you like me to explain or break down any part of this code further?

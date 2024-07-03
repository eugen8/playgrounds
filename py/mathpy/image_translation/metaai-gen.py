import matplotlib.pyplot as plt
import numpy as np

# Create a 10x10 grid
x = np.linspace(-1, 1, 10)
y = np.linspace(-1, 1, 10)
X, Y = np.meshgrid(x, y)

# Plot the original grid
plt.figure(figsize=(10, 5))

plt.subplot(1, 2, 1)
plt.plot(X.ravel(), Y.ravel(), 'k.', markersize=2)
plt.title('Original Grid')
plt.axis('equal')

# Rotate the grid by 10 degrees
angle = 10 * np.pi / 180
rotation_matrix = np.array([[np.cos(angle), -np.sin(angle)], [np.sin(angle), np.cos(angle)]])

X_rotated = X.ravel() * rotation_matrix[0, 0] + Y.ravel() * rotation_matrix[0, 1]
Y_rotated = X.ravel() * rotation_matrix[1, 0] + Y.ravel() * rotation_matrix[1, 1]

# Plot the rotated grid
plt.subplot(1, 2, 2)
plt.plot(X_rotated, Y_rotated, 'k.', markersize=2)
plt.title('Rotated Grid')
plt.axis('equal')

plt.show()

# This code will generate two plots side by side. The first plot shows the original 10x10 grid, and the second plot shows the grid after a 10-degree rotation.
# Please note that you need to have the necessary libraries installed (matplotlib and numpy) to run this code. If not installed, you can do so by running pip install matplotlib numpy in your command prompt/terminal.

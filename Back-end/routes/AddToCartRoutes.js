router.post('/users/:userId/cart', async (req, res) => {
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
        return res.status(400).json({ message: 'Product ID and quantity are required.' });
    }

    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the product already exists in the cart
        const existingItemIndex = user.cart.findIndex(item => item.productId.toString() === productId);
        if (existingItemIndex >= 0) {
            // Update quantity if product exists
            user.cart[existingItemIndex].quantity += quantity;
        } else {
            // Add new item to cart
            user.cart.push({ productId, quantity });
        }

        await user.save();
        res.status(201).json({ message: 'Product added to cart', cart: user.cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

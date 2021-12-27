import jwt from 'jsonwebtoken'

function verifyToken(req, res, next) {

  try {
    const token = req.cookies.token
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" })

    const verified = jwt.verify(token, process.env.SECRET_KEY)
    req.user = verified.user

    next()
  } catch (err) {
    res.status(401).json({ errorMessage: 'You are not authenticated!'})
  }
}

export default verifyToken
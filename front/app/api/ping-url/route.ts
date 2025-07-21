export default async function handler({ req, res }: any) {
  const { url } = req.query;
  try {
    const response = await fetch(url);
    res
      .status(200)
      .json({ status: response.status, statusText: response.statusText });
  } catch (err) {
    res.status(500).json({ status: "error", statusText: "Request failed" });
  }
}

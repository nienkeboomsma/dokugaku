import fs from 'fs'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'

const assetsFolderPath = '/dokugaku'

const mimeTypes: { [ext: string]: string } = {
  json: 'application/json',
  webp: 'image/webp',
}

export async function GET(
  request: NextRequest,
  { params }: { params: { filePath: string[] } }
) {
  const assetPath = path.join(assetsFolderPath, ...params.filePath)

  if (!fs.existsSync(assetPath)) {
    return new NextResponse('File not found', { status: 404 })
  }

  const fileBuffer = fs.readFileSync(assetPath)
  const ext = path.extname(assetPath).toLowerCase().slice(1)

  const headers = {
    'Content-Type': mimeTypes[ext] ?? 'application/octet-stream',
    'Cache-Control': 'public, max-age=31536000, immutable',
  }

  return new NextResponse(fileBuffer, { headers })
}

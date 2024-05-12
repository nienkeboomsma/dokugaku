import fs from 'fs'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'

const assetsFolderPath = '/dokugaku'

export async function GET(
  request: NextRequest,
  { params }: { params: { filePath: string[] } }
) {
  const assetPath = path.join(assetsFolderPath, ...params.filePath)
  const fileBuffer = fs.readFileSync(assetPath)

  return new NextResponse(fileBuffer)
}

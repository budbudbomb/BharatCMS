namespace GlobalCMS.Api.Infrastructure;

public static class FileValidation
{
    private static readonly Dictionary<string, byte[]> _fileSignatures = new()
    {
        { "jpg", new byte[] { 0xFF, 0xD8, 0xFF } },
        { "png", new byte[] { 0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A } },
        { "pdf", new byte[] { 0x25, 0x50, 0x44, 0x46 } }
    };

    public static bool IsValidFile(Stream fileStream, string extension)
    {
        if (!_fileSignatures.ContainsKey(extension.ToLower().TrimStart('.')))
            return false;

        var signature = _fileSignatures[extension.ToLower().TrimStart('.')];
        var header = new byte[signature.Length];
        
        fileStream.Position = 0;
        fileStream.ReadExactly(header, 0, header.Length);
        fileStream.Position = 0;

        return header.SequenceEqual(signature);
    }
}

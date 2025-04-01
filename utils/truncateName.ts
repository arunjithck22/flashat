

/**
 * Truncates a name to a specified length and adds "..." if it's too long.
 * 
 * @param name - The name to be truncated.
 * @param length - The maximum length to show before truncating. Default is 6.
 * @returns The truncated name.
 */
export const truncateName = (name: string, length: number = 6): string => {
    if (name.length > length) {
      return name.substring(0, length) + "...";
    }
    return name;
  };
  
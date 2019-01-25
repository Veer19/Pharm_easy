#include <stdio.h>
const int N = 10;
int a[N];
int main()
{
    int n = 0;
    int sum = 0;
    int i;
    // prepare an array of ascending
    // integers:  1, 2, 3, ... , N
    for( i = 0; i < N; i++ )
        a[i] = ++n;
    // so we can compute the Nth Triangular
    // number: 1 + 2 + 3 + ... + N
    for( i = 0; i < N; i++ )
        sum += a[i++];
    /* for N == 10 this should be 55 */
    printf( "%d\n", sum );
    return 0;
}

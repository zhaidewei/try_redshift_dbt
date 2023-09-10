ith source as (

    select * from {{ source('tickit', 'venue') }}

),

renamed as (

    select
        venueid,
        venuename,
        venuecity,
        venuestate,
        venueseats

    from source

)

select * from renamed


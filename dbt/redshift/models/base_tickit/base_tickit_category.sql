with source as (

    select * from {{ source('tickit', 'category') }}

),

renamed as (

    select
        catid,
        catgroup,
        catname,
        catdesc

    from source

)

select * from renamed
